import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category, CategoryPostInterface } from 'src/app/common/schema/category';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/abstract/category.abstract.service';

import { CustomDialogComponent } from 'src/app/shared-components/dialogs/custom-dialog/custom-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared-components/dialogs/confirm-dialog/confirm-dialog.component';
import { SubSink } from 'subsink';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetListFilter } from 'src/app/common/schema/datatable/Filter';
import { PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
    id: number;
    name: string;
    completePercentage: number;
    slug: string;
    description: string;
}

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
    private _sub = new SubSink();
    public actionType = ActionType;
    public categories$!: Observable<Category[]>;
    public displayedColumn = ['#', 'name', 'slug', 'completePercentage'];
    public columns: Column[] = [
        // {
        //     columnDef: '_id',
        //     header: 'ID',
        //     cell: (element: any) => `${element._id}`,
        // },
        {
            columnDef: '#',
            header: 'No.',
            cell: (element: any) => '0',
        },
        {
            columnDef: 'name',
            header: 'Name',
            cell: (element: any) => `${element.name}`,
        },
        {
            columnDef: 'slug',
            header: 'Slug',
            cell: (element: any) => `${element.slug}`,
        },
        {
            columnDef: 'completePercentage',
            header: 'Complete Percentage',
            cell: (element: any) => `${element.completePercentage}`,
        },
    ];
    public categorySubject$ = new BehaviorSubject<boolean>(true);

    public filter: GetListFilter = {
        _page: 1,
    };
    public totalItems: number = 0;

    constructor(
        private _categoryService: ApiCategoryAbstractService,
        private _dialog: MatDialog,
        private _snackbar: MatSnackBar
    ) {}

    // ---------- CYCLE HOOKS ---------- //
    ngOnInit(): void {
        // Use BehaviorSubject to notify the table to update
        this.categories$ = this.categorySubject$.asObservable().pipe(
            switchMap(() => {
                return this._categoryService.getCategoryList(this.filter).pipe(
                    map((data: any) => {
                        this.totalItems = data.paginations._totalRow;
                        return data.data;
                    })
                );
            })
        );
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    // ---------- MAIN FUNCTION ---------- //
    onActionTriggered(event: any): void {
        let { type, payload } = event;

        switch (type) {
            case ActionType.CREATE:
                this.addCategory();
                break;

            case ActionType.EDIT:
                this.editCategory(payload);
                break;

            case ActionType.DELETE:
                this.deleteCategory(payload);
                break;
        }
    }

    onPaginationChange(event: PageEvent): void {
        this.filter._page = event.pageIndex + 1;
        this.filter._limit = event.pageSize;
        this.categorySubject$.next(true);
    }

    // ---------- CREATE ---------- //
    addCategory(): void {
        // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
        this._dialog.open(CustomDialogComponent, {
            data: {
                action: this.actionType.CREATE,
                callback: this.onAddCategory,
                validateList: {
                    slug: this.validateSlug,
                },
                thisRef: this,
            },
        });
    }

    onAddCategory(category: CategoryPostInterface): void {
        this._sub.sink = this._categoryService.addCategory(category).subscribe((category) => {
            this.categorySubject$.next(true);
            this._snackbar.open('Category added', 'Dismiss', { duration: 2000 });
        });
    }

    // ---------- EDIT ---------- //
    editCategory(id: string): void {
        this._sub.sink = this._categoryService
            .retrieveCategoryByID(id)
            .subscribe((category: any) => {
                this._dialog.open(CustomDialogComponent, {
                    data: {
                        action: this.actionType.EDIT,
                        payload: category,
                        callback: this.onEditCategory,
                        thisRef: this,
                    },
                });
            });
    }

    onEditCategory(category: Category): void {
        this._sub.sink = this._categoryService.updateCategory(category).subscribe((category) => {
            this.categorySubject$.next(true);
            this._snackbar.open('Category updated', 'Dismiss', { duration: 2000 });
        });
    }

    // ---------- DELETE ---------- //
    deleteCategory(category: Category): void {
        console.log(category);

        let confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Delete Category',
                message: 'Are you sure you want to delete this category?',
                submitText: 'Delete',
            },
        });

        this._sub.sink = confirmDialogRef
            .afterClosed()
            .pipe(
                switchMap((result) => {
                    return result === 'Confirmed'
                        ? this._categoryService.deleteCategoryByID(category._id)
                        : of(null);
                })
            )
            .subscribe((data) => {
                this.categorySubject$.next(true);
                this._snackbar.open('Category deleted', 'Dismiss', { duration: 2000 });
            });
    }

    // ---------- HELPER ---------- //

    // Async validator that checks if the slug is unique when category is created
    // Note: Cannot use debounceTime, distinctUntilChanged or delay
    validateSlug(control: AbstractControl): Observable<ValidationErrors | null> {
        return timer(300).pipe(
            switchMap(() =>
                this._categoryService.retrieveCategoryBySlug(control.value).pipe(
                    map((category: [Category]) => {
                        return category[0] ? { slugExists: true } : null;
                    })
                )
            )
        );
    }
}

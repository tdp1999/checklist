import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/common/schema/category';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';

import { CustomDialogComponent } from 'src/app/shared-components/dialogs/custom-dialog/custom-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared-components/dialogs/confirm-dialog/confirm-dialog.component';
import { SubSink } from 'subsink';

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
})
export class CategoryComponent implements OnInit, OnDestroy {
    private _sub = new SubSink();
    public actionType = ActionType;
    public categories$!: Observable<Category[]>;
    public displayedColumn = ['id', 'name', 'slug', 'completePercentage'];
    public columns: Column[] = [
        {
            columnDef: 'id',
            header: 'ID',
            cell: (element: any) => `${element.id}`,
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

    constructor(private _categoryService: ApiCategoryAbstractService, private _dialog: MatDialog) {}

    ngOnInit(): void {
        // Use BehaviorSubject to notify the table to update
        this.categories$ = this.categorySubject$
            .asObservable()
            .pipe(switchMap(() => this._categoryService.getCategoryList()));
    }

    onActionTriggered(event: any): void {
        let { type, payload } = event;

        switch (type) {
            case ActionType.EDIT:
                // Call API to get data from payload
                this._sub.sink = this._categoryService
                    .retrieveCategoryByID(payload)
                    .subscribe((data: any) => {
                        this._dialog.open(CustomDialogComponent, {
                            data: { action: this.actionType.EDIT, ...data },
                        });
                    });
                break;
            case ActionType.DELETE:
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
                                ? this._categoryService.deleteCategoryByID(payload)
                                : of(null);
                        })
                    )
                    .subscribe((data) => {
                        this.categorySubject$.next(true);
                    });
                break;
        }
    }

    addCategory(): void {
        // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
        this._dialog.open(CustomDialogComponent, {
            data: {
                action: this.actionType.CREATE,
                addCategory: this.onAddCategory,
                validateSlug: this.validateSlug,
                thisRef: this,
            },
        });
    }

    onAddCategory(category: Category): void {
        this._categoryService.addCategory(category).subscribe((category) => {
            this.categorySubject$.next(true);
        });
    }

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

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { SlugifyPipe } from 'src/app/common/pipe/slugify/slugify.pipe';
import { Category } from 'src/app/common/schema/category';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { GetListFilter } from 'src/app/common/schema/datatable/Filter';
import { Item } from 'src/app/common/schema/item';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/abstract/category.abstract.service';
import { ApiItemAbstractService } from 'src/app/common/service/api/abstract/item.abstract.service';
import { ConfirmDialogComponent } from 'src/app/shared-components/dialogs/confirm-dialog/confirm-dialog.component';
import { SubSink } from 'subsink';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SlugifyPipe],
})
export class ItemComponent implements OnInit, OnDestroy {
    // Obsevable data varibles
    public items$: Observable<Item[] | undefined>;
    public actionType = ActionType;
    public loadingError$ = new Subject<boolean>();

    // Config variables
    public displayedColumn = ['#', 'name', 'categoryName', 'content', 'slug'];
    public columns: Column[] = [
        // {
        //     columnDef: '_id',
        //     header: 'ID',
        //     cell: (element: Item) => `${element._id}`,
        // },
        {
            columnDef: '#',
            header: 'No.',
            cell: (element: any) => '0',
        },
        {
            columnDef: 'name',
            header: 'Name',
            cell: (element: Item) => `${element.name}`,
        },
        {
            columnDef: 'categoryName',
            header: 'Category',
            cell: (element: Item) => `${element.categoryName}`,
        },
        {
            columnDef: 'content',
            header: 'Content',
            cell: (element: Item) => `${element.content}`,
        },
        {
            columnDef: 'slug',
            header: 'Slug',
            cell: (element: Item) => `${element.slug}`,
        },
    ];

    // Private variables
    private _sub = new SubSink();
    private _itemSubject$ = new BehaviorSubject<boolean>(true);

    // Other variables
    public categoryList: Category[] = [];
    public filter: GetListFilter = {
        _page: 1,
    };
    public totalItems: number = 0;

    constructor(
        private _router: Router,
        private _dialog: MatDialog,
        private _snackbar: MatSnackBar,
        private _slugifyPipe: SlugifyPipe,
        private _activatedRoute: ActivatedRoute,
        private _itemService: ApiItemAbstractService,
        private _categoryService: ApiCategoryAbstractService
    ) {
        // Use BehaviorSubject to notify the table to update
        this.items$ = this._itemSubject$.asObservable().pipe(
            switchMap(() =>
                this._itemService.getItemList(this.filter).pipe(
                    startWith(undefined),
                    catchError((error) => {
                        console.error(error);
                        this.loadingError$.next(true);
                        this._snackbar.open(error.message, 'Dismiss', {
                            duration: 2000,
                        });
                        return of(undefined);
                    }),
                    map((data) => {
                        if (data) {
                            // this.filter._page = data.paginations._page;
                            // this.filter._limit = data.paginations._limit;
                            this.totalItems = data.paginations._totalRow;
                            return data.data;
                        }

                        return undefined;
                    })
                )
            )
        );
    }

    ngOnInit(): void {
        // Get category list
        this._sub.sink = this._categoryService
            .getCategoryListNoPagination()
            .subscribe((categoryList: Category[]) => {
                this.categoryList = categoryList;
            });

        // Watch for item query param
        this._sub.sink = this._activatedRoute.queryParams.subscribe((queryParams) => {
            if (queryParams.itemID) {
                this.editItem(queryParams.itemID);
            }
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    // ---------- MAIN FUNCTION ---------- //
    onActionTriggered(event: any): void {
        let { type, payload } = event;

        switch (type) {
            case ActionType.VIEW:
                this.viewItem(payload);
                break;

            case ActionType.CREATE:
                this.addItem();
                break;

            case ActionType.EDIT:
                this.editItem(payload);
                break;

            case ActionType.DELETE:
                this.deleteItem(payload);
                break;
        }
    }

    onPaginationChange(event: PageEvent) {
        this.filter._page = event.pageIndex + 1;
        this.filter._limit = event.pageSize;
        this._itemSubject$.next(true);
    }

    // ---------- VIEW ---------- //
    viewItem(payload: Item): void {
        let categorySlug = this._slugifyPipe.transform(payload.categoryName);
        this._router.navigate(['/checklist/', categorySlug, payload.slug]);
        console.log(payload);
    }

    // ---------- CREATE ---------- //
    addItem(): void {
        this._dialog.open(ItemDialogComponent, {
            data: {
                action: this.actionType.CREATE,
                callback: this.onAddItem,
                validateList: {
                    slug: this.validateSlug,
                },
                category: this.categoryList,
                thisRef: this,
            },
        });
    }

    onAddItem(submitValue: Item): void {
        this._sub.sink = this._itemService.addItem(submitValue).subscribe((item) => {
            this._itemSubject$.next(true);
            this._snackbar.open('Item added', 'Dismiss', { duration: 2000 });
        });
    }

    // ---------- EDIT ---------- //
    editItem(id: string): void {
        this._sub.sink = this._itemService.retrieveItem(id).subscribe((item: [Item]) => {
            this._dialog.open(ItemDialogComponent, {
                data: {
                    action: this.actionType.EDIT,
                    callback: this.onEditItem,
                    validateList: {
                        slug: this.validateSlug,
                    },
                    category: this.categoryList,
                    thisRef: this,
                    payload: item[0],
                },
            });
        });
    }

    onEditItem(submitValue: Item): void {
        console.log(submitValue);
        this._sub.sink = this._itemService.updateItem(submitValue).subscribe((item) => {
            this._itemSubject$.next(true);
            this._snackbar.open('Item updated', 'Dismiss', { duration: 2000 });
        });
    }

    // ---------- DELETE ---------- //
    deleteItem(item: Item): void {
        let confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
            data: {
                title: 'Delete Item',
                message: 'Are you sure you want to delete this item?',
                submitText: 'Delete',
            },
        });

        this._sub.sink = confirmDialogRef
            .afterClosed()
            .pipe(
                switchMap((result) => {
                    return result === 'Confirmed'
                        ? this._itemService.deleteItemByID(item._id, item.categoryID)
                        : of(null);
                })
            )
            .subscribe((data) => {
                if (data) {
                    this._itemSubject$.next(true);
                    this._snackbar.open('Item deleted', 'Dismiss', { duration: 2000 });
                }
            });
    }

    // ---------- HELPER ---------- //

    // Async validator that checks if the slug is unique when category is created
    // Note: Cannot use debounceTime, distinctUntilChanged or delay
    validateSlug(control: AbstractControl): Observable<ValidationErrors | null> {
        return timer(300).pipe(
            switchMap(() =>
                this._itemService.retrieveItemBySlug(control.value).pipe(
                    map((item: [Item] | []) => {
                        return item[0] ? { slugExists: true } : null;
                    })
                )
            )
        );
    }
}

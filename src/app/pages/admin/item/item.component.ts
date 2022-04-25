import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/common/schema/category';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { Item } from 'src/app/common/schema/item';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';
import { ApiItemAbstractService } from 'src/app/common/service/api/api-item-abstract.service';
import { ConfirmDialogComponent } from 'src/app/shared-components/dialogs/confirm-dialog/confirm-dialog.component';
import { SubSink } from 'subsink';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit, OnDestroy {
    // Obsevable data varibles
    public items$!: Observable<Item[]>;
    public actionType = ActionType;

    // Config variables
    public displayedColumn = ['id', 'name', 'category', 'content', 'slug'];
    public columns: Column[] = [
        {
            columnDef: 'id',
            header: 'ID',
            cell: (element: Item) => `${element.id}`,
        },
        {
            columnDef: 'name',
            header: 'Name',
            cell: (element: Item) => `${element.name}`,
        },
        {
            columnDef: 'category',
            header: 'Category',
            cell: (element: Item) => `${element.categoryId}`,
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

    constructor(
        private _categoryService: ApiCategoryAbstractService,
        private _itemService: ApiItemAbstractService,
        private _dialog: MatDialog,
        private _snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        // Use BehaviorSubject to notify the table to update
        this.items$ = this._itemSubject$
            .asObservable()
            .pipe(switchMap(() => this._itemService.getItemList()));

        // Get category list
        this._sub.sink = this._categoryService
            .getCategoryList()
            .subscribe((categoryList: Category[]) => {
                this.categoryList = categoryList;
            });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    // ---------- MAIN FUNCTION ---------- //
    onActionTriggered(event: any): void {
        let { type, payload } = event;

        switch (type) {
            // case ActionType.VIEW:
            //     this.viewItem(payload);
            //     break;

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

    // ---------- VIEW ---------- //
    // viewItem(id: string): void {
    //     console.log(id);
    // }

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
        this._sub.sink = this._itemService.retrieveItem(id).subscribe((item: Item) => {
            this._dialog.open(ItemDialogComponent, {
                data: {
                    action: this.actionType.EDIT,
                    callback: this.onEditItem,
                    validateList: {
                        slug: this.validateSlug,
                    },
                    category: this.categoryList,
                    thisRef: this,
                    payload: item,
                },
            });
        });
    }

    onEditItem(submitValue: Item): void {
        this._sub.sink = this._itemService.updateItem(submitValue).subscribe((item) => {
            this._itemSubject$.next(true);
            this._snackbar.open('Item updated', 'Dismiss', { duration: 2000 });
        });
    }

    // ---------- DELETE ---------- //
    deleteItem(id: string): void {
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
                    return result === 'Confirmed' ? this._itemService.deleteItemByID(id) : of(null);
                })
            )
            .subscribe((data) => {
                this._itemSubject$.next(true);
                this._snackbar.open('Item deleted', 'Dismiss', { duration: 2000 });
            });
    }

    // ---------- HELPER ---------- //

    // Async validator that checks if the slug is unique when category is created
    // Note: Cannot use debounceTime, distinctUntilChanged or delay
    validateSlug(control: AbstractControl): Observable<ValidationErrors | null> {
        return timer(300).pipe(
            switchMap(() =>
                this._itemService.retrieveItemBySlug(control.value).pipe(
                    map((item: [Item]) => {
                        return item[0] ? { slugExists: true } : null;
                    })
                )
            )
        );
    }
}

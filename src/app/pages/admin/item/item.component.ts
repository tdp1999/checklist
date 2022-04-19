import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { Item } from 'src/app/common/schema/item';
import { ApiItemAbstractService } from 'src/app/common/service/api/api-item-abstract.service';
import { SubSink } from 'subsink';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
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

    constructor(
        private _itemService: ApiItemAbstractService,
        private _dialog: MatDialog,
        private _snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.items$ = this._itemService.getItemList();
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

    // ---------- VIEW ---------- //
    viewItem(id: string): void {
        console.log(id);
    }

    // ---------- CREATE ---------- //
    addItem(): void {
        console.log('add item');

        this._dialog.open(ItemDialogComponent, {
            data: {
                action: this.actionType.CREATE,
                callback: this.onAddItem,
                // validateList: {
                //     slug: this.validateSlug,
                // },
                thisRef: this,
            },
        });
    }

    onAddItem() {
        // this._sub.sink = this._itemService.subscribe((category) => {
        //     this.categorySubject$.next(true);
        //     this._snackbar.open('Category added', 'Dismiss', { duration: 2000 });
        // });
    }

    // ---------- EDIT ---------- //
    editItem(id: string): void {
        console.log(id);
    }

    // ---------- DELETE ---------- //
    deleteItem(id: string): void {
        console.log(id);
    }

    // ---------- HELPER ---------- //

    // Async validator that checks if the slug is unique when category is created
    // Note: Cannot use debounceTime, distinctUntilChanged or delay
    // validateSlug(control: AbstractControl): Observable<ValidationErrors | null> {
    //     return timer(300).pipe(
    //         switchMap(() =>
    //             this._itemService.retrieveCategoryBySlug(control.value).pipe(
    //                 map((item: [Item]) => {
    //                     return item[0] ? { slugExists: true } : null;
    //                 })
    //             )
    //         )
    //     );
    // }
}

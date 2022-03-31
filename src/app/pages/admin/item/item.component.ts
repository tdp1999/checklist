import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { Item } from 'src/app/common/schema/item';
import { ApiItemAbstractService } from 'src/app/common/service/api/api-item-abstract.service';

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
    public displayedColumn = ['id', 'title', 'category', 'contentID', 'slug'];
    public columns: Column[] = [
        {
            columnDef: 'id',
            header: 'ID',
            cell: (element: any) => `${element.id}`,
        },
        {
            columnDef: 'title',
            header: 'Title',
            cell: (element: any) => `${element.title}`,
        },
        {
            columnDef: 'category',
            header: 'Category',
            cell: (element: any) => `${element.category}`,
        },
        {
            columnDef: 'contentID',
            header: 'Content ID',
            cell: (element: any) => `${element.idContent}`,
        },
        {
            columnDef: 'slug',
            header: 'Slug',
            cell: (element: any) => `${element.slug}`,
        },
    ];

    constructor(private _itemService: ApiItemAbstractService) {}

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
        console.log('addItem');
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
}

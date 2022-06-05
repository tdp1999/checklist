import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent implements OnChanges, OnInit, AfterViewInit {
    @Input() columns!: Column[];
    @Input() dataSource: any[] | undefined | null = [];
    @Input() displayedColumns!: string[];
    @Input() actions: ActionType[] = [];
    @Input() totalItems: number = 0;

    @ViewChild(MatTable) table!: MatTable<unknown>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @Output() onActionTriggered: EventEmitter<{ type: ActionType; payload: string }> =
        new EventEmitter();
    @Output() onPaginationChange: EventEmitter<PageEvent> = new EventEmitter();

    public data: MatTableDataSource<any> = new MatTableDataSource();
    public actionType = ActionType;

    constructor(private _cdr: ChangeDetectorRef, private _zone: NgZone) {}

    ngOnChanges(changes: any): void {
        // DataSource is immutable, so we need to create a new instance to update the table
        // this.data = new MatTableDataSource<any>(this.dataSource ?? []);
        this.data.data = this.dataSource ?? [];
        // if (this.paginator) {
        //     this.paginator.length = this.totalItems;
        //     // this.data.paginator = this.paginator;
        // }
        // console.log('onChange table: ', this.data.paginator);
        // console.log('onChange input total: ', this.totalItems);
    }

    ngOnInit(): void {
        if (this.actions.length > 0) this.displayedColumns = [...this.displayedColumns, 'action'];
    }

    ngAfterViewInit(): void {
        // Connect the table to the paginator
        // this.paginator.length = this.totalItems;
        // this.data.paginator = this.paginator;
        // console.log('view init table: ', this.data.paginator);
        // console.log('view init input total: ', this.totalItems);
    }

    actionTriggered(type: ActionType, elementId: string): void {
        this.onActionTriggered.emit({
            type,
            payload: elementId,
        });
    }

    pageChange(event: PageEvent) {
        this.onPaginationChange.emit(event);
    }
}

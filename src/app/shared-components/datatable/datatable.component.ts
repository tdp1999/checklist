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
    // public pageSize = 10;

    constructor(private _cdr: ChangeDetectorRef, private _zone: NgZone) {}

    ngOnChanges(changes: any): void {
        this.data.data = this.dataSource ?? [];
    }

    ngOnInit(): void {
        if (this.actions.length > 0) this.displayedColumns = [...this.displayedColumns, 'action'];
    }

    ngAfterViewInit(): void {}

    actionTriggered(type: ActionType, payload: any): void {
        this.onActionTriggered.emit({
            type,
            payload,
        });
    }

    pageChange(event: PageEvent) {
        this.onPaginationChange.emit(event);
    }
}

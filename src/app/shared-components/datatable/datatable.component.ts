import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatatableComponent implements OnInit, AfterViewInit {
    @Input() columns!: Column[];
    @Input() dataSource!: any[];
    @Input() displayedColumns!: string[];
    @Input() actions: ActionType[] = [];

    @ViewChild(MatTable) table!: MatTable<unknown>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @Output() onActionTriggered: EventEmitter<{ type: ActionType; payload: string }> =
        new EventEmitter();

    public data: any = [];
    public actionType = ActionType;

    constructor() {}

    ngOnInit(): void {
        this.data = new MatTableDataSource<any>(this.dataSource);

        if (this.actions.length > 0) this.displayedColumns = [...this.displayedColumns, 'action'];
    }

    ngAfterViewInit(): void {
        this.data.paginator = this.paginator;
    }

    actionTriggered(type: ActionType, elementId: string): void {
        this.onActionTriggered.emit({
            type,
            payload: elementId,
        });
    }
}

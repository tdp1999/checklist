import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/common/schema/category';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Column } from 'src/app/common/schema/datatable/Column';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';

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
export class CategoryComponent implements OnInit {
    public actionType = ActionType;
    public categories$!: Observable<Category[]>;
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
    public displayedColumn = ['id', 'name', 'slug', 'completePercentage'];

    constructor(private _categoryService: ApiCategoryAbstractService) {}

    ngOnInit(): void {
        this.categories$ = this._categoryService.getCategoryList();
    }

    onActionTriggered(event: any): void {
        let { type, payload } = event;

        switch (type) {
            case ActionType.EDIT:
                console.log('edit', payload);
                break;
            case ActionType.DELETE:
                console.log('delete', payload);
                break;
            case ActionType.VIEW:
                console.log('view', payload);
                break;
        }
    }
}

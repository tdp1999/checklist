import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GetListFilter } from '../../schema/datatable/Filter';
import { PaginationInterface } from '../../schema/general-schema';
import { Item } from '../../schema/item';
import { ApiCategoryAbstractService } from './api-category-abstract.service';
import { ApiHttpService } from './api-http.service';
import { ApiPageListService } from './api-page-list.service';

@Injectable({
    providedIn: 'root',
})
export class ApiItemAbstractService {
    constructor(private _api: ApiHttpService, private _listPageService: ApiPageListService) {}

    getItemList(filter: GetListFilter): Observable<PaginationInterface<Item[]>> {
        let queryParam = new HttpParams({ fromObject: filter as {} });
        return this._api.get('item', { params: queryParam });
    }

    retrieveItem(id: string): Observable<Item> {
        return this._api.get(`item/${id}`);
    }

    retrieveItemBySlug(slug: string): Observable<[Item] | []> {
        return this._api.get(`item?slug=${slug}`);
    }

    addItem(item: Required<Item>): Observable<Item> {
        return this._api.post('item', item).pipe(
            finalize(() => {
                this._listPageService.calculateCompletePercentageOfACategory(item.categoryId);
            })
        );
    }

    updateItem(item: Required<Item>): Observable<Item> {
        return this._api.put(`item/${item.id}`, item).pipe(
            finalize(() => {
                if ('isDone' in item) {
                    this._listPageService.calculateCompletePercentageOfACategory(item.categoryId);
                }
            })
        );
    }

    patchItem(item: Partial<Item>, categoryId: string): Observable<Item> {
        return this._api.patch(`item/${item.id}`, item).pipe(
            finalize(() => {
                if ('isDone' in item) {
                    this._listPageService.calculateCompletePercentageOfACategory(categoryId);
                }
            })
        );
    }

    deleteItemByID(id: string, categoryId: string): Observable<Item> {
        return this._api.delete(`item/${id}`).pipe(
            finalize(() => {
                this._listPageService.calculateCompletePercentageOfACategory(categoryId);
            })
        );
    }
}

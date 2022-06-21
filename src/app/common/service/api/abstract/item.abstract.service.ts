import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GetListFilter } from '../../../schema/datatable/Filter';
import { PaginationInterface } from '../../../schema/general-schema';
import { Item, ItemPostInterface } from '../../../schema/item';
import { ApiCategoryAbstractService } from '../abstract/category.abstract.service';
import { ApiHttpService } from '../api-http.service';
import { ApiPageListService } from '../page/api-page-list.service';

@Injectable({
    providedIn: 'root',
})
export class ApiItemAbstractService {
    constructor(private _api: ApiHttpService, private _listPageService: ApiPageListService) {}

    getItemList(filter: GetListFilter): Observable<PaginationInterface<Item[]>> {
        let queryParam = new HttpParams({ fromObject: filter as {} });
        return this._api.get('item', { params: queryParam });
    }

    retrieveItem(id: string): Observable<[Item]> {
        return this._api.get(`item/${id}`);
    }

    retrieveItemBySlug(slug: string): Observable<[Item] | []> {
        return this._api.get(`item?slug=${slug}`);
    }

    addItem(item: ItemPostInterface): Observable<Item> {
        return this._api.post('item', item).pipe(
            finalize(() => {
                this._listPageService.calculateCompletePercentageOfACategory(item.categoryID);
            })
        );
    }

    updateItem(item: Item): Observable<Item> {
        return this._api.put(`item/${item._id}`, item);
    }

    patchItem(item: Partial<Item>, categoryID: string): Observable<Item> {
        return this._api.patch(`item/${item._id}`, item);
    }

    deleteItemByID(id: string, categoryID: string): Observable<Item> {
        return this._api.delete(`item/${id}`).pipe(
            finalize(() => {
                this._listPageService.calculateCompletePercentageOfACategory(categoryID);
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../schema/item';
import { ApiHttpService } from './api-http.service';

@Injectable({
    providedIn: 'root',
})
export class ApiItemAbstractService {
    constructor(private _api: ApiHttpService) {}

    getItemList(): Observable<Item[]> {
        return this._api.get('item');
    }

    retrieveItem(id: number): Observable<Item> {
        return this._api.get(`item/${id}`);
    }

    retrieveItemBySlug(slug: string): Observable<Item> {
        return this._api.get(`item?slug/${slug}`);
    }

    addItem(item: Required<Item>): Observable<Item> {
        return this._api.post('item', item);
    }

    updateItem(item: Required<Item>): Observable<Item> {
        return this._api.put(`item/${item.id}`, item);
    }

    deleteItem(id: number): Observable<Item> {
        return this._api.delete(`item/${id}`);
    }
}

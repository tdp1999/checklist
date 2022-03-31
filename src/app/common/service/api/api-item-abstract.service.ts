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
}

import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';

@Injectable({
    providedIn: 'root',
})
export class ApiCategoryAbstractService {
    constructor(private _api: ApiHttpService) {}

    getCategoryList() {
        return this._api.get('category');
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../schema/category';
import { ApiHttpService } from './api-http.service';

@Injectable({
    providedIn: 'root',
})
export class ApiCategoryAbstractService {
    constructor(private _api: ApiHttpService) {}

    getCategoryList() {
        return this._api.get('category');
    }

    retrieveCategoryByID(id: string): Observable<Category> {
        return this._api.get(`category/${id}`);
    }

    retrieveCategoryBySlug(slug: string): Observable<[Category]> {
        console.log(slug);
        return this._api.get(`category?slug=${slug}`);
    }
}

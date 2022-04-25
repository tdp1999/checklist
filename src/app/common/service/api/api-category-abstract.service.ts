import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../schema/category';
import { ApiHttpService } from './api-http.service';

@Injectable({
    providedIn: 'root',
})
export class ApiCategoryAbstractService {
    constructor(private _api: ApiHttpService) {}

    getCategoryList(): Observable<Category[]> {
        return this._api.get('category');
    }

    retrieveCategoryByID(id: string): Observable<Category> {
        return this._api.get(`category/${id}`);
    }

    retrieveCategoryBySlug(slug: string): Observable<[Category]> {
        return this._api.get(`category?slug=${slug}`);
    }

    addCategory(category: Category): Observable<Category> {
        return this._api.post('category', category);
    }

    updateCategory(category: Category): Observable<Category> {
        return this._api.put(`category/${category.id}`, category);
    }

    deleteCategoryByID(id: string): Observable<any> {
        return this._api.delete(`category/${id}`);
    }
}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from '../../schema/category';
import { GetListFilter } from '../../schema/datatable/Filter';
import { PaginationInterface } from '../../schema/general-schema';
import { SidenavService } from '../sidenav.service';
import { ApiHttpService } from './api-http.service';

@Injectable({
    providedIn: 'root',
})
export class ApiCategoryAbstractService {
    constructor(private _api: ApiHttpService, private _sidebarService: SidenavService) {}

    getCategoryListNoPagination(): Observable<Category[]> {
        return this._api.get('category');
    }

    getCategoryList(filter: GetListFilter): Observable<PaginationInterface<Category[]>> {
        let queryParam = new HttpParams({ fromObject: filter as {} });
        return this._api.get('category', { params: queryParam });
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

    patchCategory(category: Partial<Category>): Observable<Category> {
        return this._api.patch(`category/${category.id}`, category).pipe(
            tap(() => {
                this._sidebarService.remindToReloadCategory();
            })
        );
    }

    deleteCategoryByID(id: string): Observable<any> {
        return this._api.delete(`category/${id}`);
    }
}

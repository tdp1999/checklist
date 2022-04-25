import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ErrorMessage } from '../../constants/error-message';
import { Item } from '../../schema/item';
import { ApiHttpService } from './api-http.service';
import { QueryStringParamsService } from './query-string-params.service';

@Injectable({
    providedIn: 'root',
})
export class ApiPageListService {
    constructor(
        private _apiHttpService: ApiHttpService,
        private _queryStringParamsService: QueryStringParamsService
    ) {}

    // Get category id base on category name
    public getCategoryId = (slug: string): Observable<string | null> => {
        return this._apiHttpService.get(`category?slug=${slug}`).pipe(
            map((data) => {
                if (data.length > 0) return data[0].id;
                else {
                    return null;
                }
            })
        );
    };

    // Get content base on category slug. It will call getCategoryId() first
    // {{ url }}item?category={{ params.section }}&_page=1&_limit=10
    public getContentByCategorySlug = (
        category: string,
        page: number,
        limit: number
    ): Observable<Item[]> => {
        return this.getCategoryId(category).pipe(
            switchMap((categoryId) => {
                if (categoryId === null) {
                    return throwError(ErrorMessage.CategoryNotFound);
                } else {
                    const params = [
                        { key: 'categoryId', value: categoryId },
                        { key: '_page', value: page },
                        { key: '_limit', value: limit },
                    ];

                    const queryString = this._queryStringParamsService.toString(params);

                    // Option 1: Use query string
                    return this._apiHttpService.get('item?' + queryString);

                    // Option 2: Use params
                    // return this._apiHttpService.get('item', params);
                }
            })
        );
    };
}

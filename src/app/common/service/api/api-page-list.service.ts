import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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
    public getCategoryId = (categoryName: string): Observable<any> => {
        return this._apiHttpService
            .get(`category?name=${categoryName}`)
            .pipe(map((data) => data[0].id));
    };

    // Get content base on cateogory id
    // {{ url }}item?category={{ params.section }}&_page=1&_limit=10
    public getContentByCategory = (category: string, page: number, limit: number) => {
        return this.getCategoryId(category).pipe(
            switchMap((categoryId) => {
                const params = [
                    { key: 'category', value: categoryId },
                    { key: '_page', value: page },
                    { key: '_limit', value: limit },
                ];

                const queryString = this._queryStringParamsService.toString(params);

                // Option 1: Use query string
                return this._apiHttpService.get('item?' + queryString);

                // Option 2: Use params
                // return this._apiHttpService.get('item', params);
            })
        );
    };
}

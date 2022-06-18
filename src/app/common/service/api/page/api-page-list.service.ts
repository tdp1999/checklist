import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { LoadingSpinnerComponent } from 'src/app/shared-components/loading-spinner/loading-spinner.component';
import { ErrorMessage } from '../../../constants/error-message';
import { Item } from '../../../schema/item';
import { ApiCategoryAbstractService } from '../abstract/category.abstract.service';
import { ApiHttpService } from '../api-http.service';
import { QueryStringParamsService } from '../query-string-params.service';

@Injectable({
    providedIn: 'root',
})
export class ApiPageListService {
    constructor(
        private _apiHttpService: ApiHttpService,
        private _queryStringParamsService: QueryStringParamsService,
        private _categoryService: ApiCategoryAbstractService
    ) {}

    // Get content base on category slug.
    public getCategoryItemByCategorySlug(categorySlug: string): Observable<Item[]> {
        return this._apiHttpService.get(`item?categorySlug=${categorySlug}`);
    }

    public getContentByCategoryId = (category_id: string): Observable<Item[]> => {
        return this._apiHttpService.get(`item?categoryID=${category_id}`);
    };

    public calculateCompletePercentageOfACategory = (categoryID: string): void => {
        this.getContentByCategoryId(categoryID).subscribe((data) => {
            const total = data.length;
            let complete = 0;

            data.forEach((item) => {
                if (item.isDone) {
                    complete++;
                }
            });

            const completePercentage = Math.round((complete / total) * 100);

            this._categoryService
                .patchCategory({ _id: categoryID, completePercentage })
                .subscribe();
        });
    };

    public calculateCompletePercentageOfAllCategories = (): void => {
        this._categoryService.getCategoryListNoPagination().subscribe((data) => {
            data.forEach((category) => {
                this.calculateCompletePercentageOfACategory(category._id);
            });
        });
    };
}

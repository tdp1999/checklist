import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, iif, Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/common/schema/item';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';
import { ApiPageListService } from 'src/app/common/service/api/api-page-list.service';
import { SidenavService } from 'src/app/common/service/sidenav.service';
import { SubSink } from 'subsink';
import { ApiItemAbstractService } from 'src/app/common/service/api/api-item-abstract.service';

interface checkboxItem {
    id: string;
    isDone: boolean;
    categoryId: string;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
    // private _subs = new SubSink();

    public checkList$!: Observable<Item[] | undefined>;
    public itemCheckboxList: checkboxItem[] = [];
    public loadingError$ = new Subject<boolean>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _apiPageListService: ApiPageListService,
        private _categoryService: ApiCategoryAbstractService,
        private _itemService: ApiItemAbstractService,
        private _router: Router,
        private _snackbar: MatSnackBar,
        private _cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // Params
        this.checkList$ = this._activatedRoute.params.pipe(
            // Get content base on category
            switchMap((params) => {
                if (!params.section) {
                    this.onCategoryNotFound();
                    return of([]);
                }

                return this._apiPageListService
                    .getContentByCategorySlug(params.section, 1, 10)
                    .pipe(
                        startWith([]),
                        catchError((error) => {
                            console.error(error);
                            this.loadingError$.next(true);
                            this._snackbar.open(error.message, 'Dismiss', {
                                duration: 2000,
                            });
                            this.onCategoryNotFound();
                            return of([]);
                        })
                        // finalize(() => {
                        //     console.log('finalize');
                        // })
                    );
            }),
            tap((itemList: Item[]) => {
                if (!itemList) console.log('No item list');
                this.itemCheckboxList = itemList.map((item) => {
                    return {
                        id: item.id,
                        isDone: item.isDone,
                        categoryId: item.categoryId,
                    };
                });
            }),
            finalize(() => {
                console.log('Stream terminated');
            })
        );
    }

    ngOnDestroy(): void {
        // this._subs.unsubscribe();
    }

    onCheckboxChanges(item: checkboxItem): void {
        this._itemService.patchItem(item, item.categoryId).subscribe(() => {
            this._snackbar.open('Item updated', 'Dismiss', {
                duration: 2000,
            });
        });
    }

    onCategoryNotFound(): void {
        this._categoryService.getCategoryListNoPagination().subscribe((category) => {
            this._router.navigate(['/checklist/', category[0].slug]);
        });
    }
}

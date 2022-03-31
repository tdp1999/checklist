import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, iif, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/common/schema/item';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';
import { ApiPageListService } from 'src/app/common/service/api/api-page-list.service';
import { SidenavService } from 'src/app/common/service/sidenav.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
    // private _subs = new SubSink();

    public checkList$!: Observable<Item[]>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _apiPageListService: ApiPageListService,
        private _categoryService: ApiCategoryAbstractService,
        private _router: Router,
        private _snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        // Params
        this.checkList$ = this._activatedRoute.params.pipe(
            // Get content base on cateogory
            switchMap((params) => {
                if (!params.section) {
                    this._categoryService.getCategoryList().subscribe((category) => {
                        this._router.navigate(['/checklist/', category[0].slug]);
                        return EMPTY;
                    });
                }
                return this._apiPageListService.getContentByCategory(params.section, 1, 10).pipe(
                    catchError((error) => {
                        this._snackbar.open(error, 'Close', { duration: 3000 });
                        this._router.navigate(['/checklist/']);
                        return EMPTY;
                    })
                );
            })
        );

        // Data
        // this._subs.sink = this._activatedRoute.data.subscribe((data) => {});
    }

    ngOnDestroy(): void {
        // this._subs.unsubscribe();
    }
}

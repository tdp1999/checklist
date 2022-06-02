import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/common/schema/category';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';
import { SidenavService } from 'src/app/common/service/sidenav.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
    opened!: boolean;

    private _sub = new SubSink();

    public categoryList$!: Observable<Category[]>;
    public loadingError$ = new Subject<boolean>();

    constructor(
        private sidebarService: SidenavService,
        private _categoryService: ApiCategoryAbstractService,
        private _cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        // Toggle sidebar on click
        this._sub.sink = this.sidebarService.currentState.subscribe((state) => {
            this.opened = state;
            this._cdr.markForCheck();
        });

        // Load categories
        this.categoryList$ = this.sidebarService.reloadCategoryObs.pipe(
            switchMap((data) => {
                return this._categoryService.getCategoryList().pipe(
                    catchError((error) => {
                        console.error(error);
                        this.loadingError$.next(true);
                        return of([]);
                    })
                );
            })
        );
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}

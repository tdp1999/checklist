import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, iif, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/common/schema/item';
import { ApiPageListService } from 'src/app/common/service/api/api-page-list.service';
import { SidenavService } from 'src/app/common/service/sidenav.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
    // private _subs = new SubSink();

    public checkList$!: Observable<Item[]>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _apiPageListService: ApiPageListService,
        private _sideNavService: SidenavService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        // Params
        this.checkList$ = this._activatedRoute.params.pipe(
            // Get content base on cateogory
            switchMap((params) => {
                if (!params.section) {
                    this._sideNavService.getCategoryList().subscribe((category) => {
                        this._router.navigate(['/checklist/', category[0].name]);
                        return EMPTY;
                    });
                }
                return this._apiPageListService.getContentByCategory(params.section, 1, 10);
            })
        );

        // Data
        // this._subs.sink = this._activatedRoute.data.subscribe((data) => {});
    }

    ngOnDestroy(): void {
        // this._subs.unsubscribe();
    }
}

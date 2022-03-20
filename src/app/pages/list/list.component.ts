import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/common/schema/item';
import { ApiPageListService } from 'src/app/common/service/api/api-page-list.service';
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
        private _apiPageListService: ApiPageListService
    ) {}

    ngOnInit(): void {
        // Params
        this.checkList$ = this._activatedRoute.params.pipe(
            // Get content base on cateogory
            switchMap((params) => {
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

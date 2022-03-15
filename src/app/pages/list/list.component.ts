import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
    private _subs = new SubSink();

    constructor(private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        // Params
        this._subs.sink = this._activatedRoute.params.subscribe((params) => {});

        // Data
        this._subs.sink = this._activatedRoute.data.subscribe((data) => {});
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }
}

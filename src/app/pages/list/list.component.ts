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
        this._subs.sink = this._activatedRoute.params.subscribe((params) => {
            console.log(params);
        });
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }
}

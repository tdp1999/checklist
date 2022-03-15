import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        // this._activatedRoute.params.subscribe((params) => {
        //     console.log(params);
        // });
    }
}

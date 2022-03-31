import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-fluid-layout',
    templateUrl: './fluid-layout.component.html',
    styleUrls: ['./fluid-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FluidLayoutComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

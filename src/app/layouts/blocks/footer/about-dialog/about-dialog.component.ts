import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-dialog',
    templateUrl: './about-dialog.component.html',
    styleUrls: ['./about-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDialogComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}

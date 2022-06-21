import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    constructor(public dialog: MatDialog) {}

    openDialog() {
        this.dialog.open(AboutDialogComponent, {
            width: '60%',
            height: 'fit-content',
        });
    }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';

// Import Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [ConfirmDialogComponent],
    imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class ConfirmDialogModule {}

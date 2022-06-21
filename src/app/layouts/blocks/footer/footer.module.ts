import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';

// Material modules
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [FooterComponent, AboutDialogComponent],
    exports: [FooterComponent],
    imports: [CommonModule, MatIconModule, MatDialogModule],
})
export class FooterModule {}

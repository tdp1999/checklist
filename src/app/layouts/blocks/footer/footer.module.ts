import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';

// Material modules
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [CommonModule, MatIconModule],
})
export class FooterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';

// Import Material Modules
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [BreadcrumbComponent],
    imports: [CommonModule, RouterModule, MatIconModule],
    exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';
import { CustomDialogModule } from 'src/app/shared-components/custom-dialog/custom-dialog.module';

// Import Material modules
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        DatatableModule,
        CustomDialogModule,
        MatButtonModule,
    ],
})
export class CategoryModule {}

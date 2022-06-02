import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';
import { LoadingSpinnerModule } from 'src/app/shared-components/loading-spinner/loading-spinner.module';

// Dialogs
import { CustomDialogModule } from 'src/app/shared-components/dialogs/custom-dialog/custom-dialog.module';
import { ConfirmDialogModule } from 'src/app/shared-components/dialogs/confirm-dialog/confirm-dialog.module';

// Import Material modules
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [CategoryComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        DatatableModule,
        MatButtonModule,
        CustomDialogModule,
        ConfirmDialogModule,
        LoadingSpinnerModule,
    ],
})
export class CategoryModule {}

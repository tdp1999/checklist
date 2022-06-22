import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';

import { ItemDialogModule } from './item-dialog/item-dialog.module';
import { SlugifyModule } from 'src/app/common/pipe/slugify/slugify.module';

// Import Material Modules
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinnerModule } from 'src/app/shared-components/loading-spinner/loading-spinner.module';

@NgModule({
    declarations: [ItemComponent],
    imports: [
        CommonModule,
        ItemRoutingModule,
        DatatableModule,
        MatButtonModule,
        ItemDialogModule,
        LoadingSpinnerModule,
        SlugifyModule,
    ],
})
export class ItemModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';

// Import Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [ItemComponent],
    imports: [CommonModule, ItemRoutingModule, DatatableModule, MatButtonModule],
})
export class ItemModule {}

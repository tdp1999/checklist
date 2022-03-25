import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';

@NgModule({
    declarations: [ItemComponent],
    imports: [CommonModule, ItemRoutingModule, DatatableModule],
})
export class ItemModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { DatatableModule } from 'src/app/shared-components/datatable/datatable.module';

@NgModule({
    declarations: [CategoryComponent],
    imports: [CommonModule, CategoryRoutingModule, DatatableModule],
})
export class CategoryModule {}

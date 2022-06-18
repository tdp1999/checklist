import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';

// Import Material table
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { OrderNumberModule } from 'src/app/common/pipe/order-number/order-number.module';

@NgModule({
    declarations: [DatatableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        LoadingSpinnerModule,
        OrderNumberModule,
    ],
    exports: [DatatableComponent],
})
export class DatatableModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderNumberPipe } from './order-number.pipe';

@NgModule({
    declarations: [OrderNumberPipe],
    imports: [CommonModule],
    exports: [OrderNumberPipe],
})
export class OrderNumberModule {}

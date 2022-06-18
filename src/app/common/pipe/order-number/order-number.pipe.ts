import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderNumber',
    pure: true,
})
export class OrderNumberPipe implements PipeTransform {
    transform(
        rowIndex: string | number,
        pageIndex: string | number,
        pageSize: string | number
    ): unknown {
        return +rowIndex + 1 + +pageSize * +pageIndex;
    }
}

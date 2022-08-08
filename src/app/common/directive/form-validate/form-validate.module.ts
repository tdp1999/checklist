import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorDirective } from './control-error.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldMarginDirective } from './mat-form-field-margin.directive';

@NgModule({
    declarations: [ControlErrorDirective, MatFormFieldMarginDirective],
    imports: [CommonModule, MatFormFieldModule],
    exports: [ControlErrorDirective, MatFormFieldMarginDirective],
})
export class FormValidateModule {}

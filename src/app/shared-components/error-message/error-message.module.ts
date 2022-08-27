import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [ErrorMessageComponent],
    imports: [CommonModule, MatFormFieldModule],
    exports: [ErrorMessageComponent],
})
export class ErrorMessageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDialogComponent } from './custom-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SlugifyModule } from 'src/app/common/pipe/slugify/slugify.module';
import { ErrorMessageModule } from '../../error-message/error-message.module';

@NgModule({
    declarations: [CustomDialogComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SlugifyModule,
        ErrorMessageModule,
    ],
})
export class CustomDialogModule {}

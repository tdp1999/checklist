import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDialogComponent } from './item-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SlugifyModule } from 'src/app/common/pipe/slugify/slugify.module';

@NgModule({
    declarations: [ItemDialogComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SlugifyModule,
    ],
})
export class ItemDialogModule {}

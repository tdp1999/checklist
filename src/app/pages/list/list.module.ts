import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

// Import Material Components
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingSpinnerModule } from 'src/app/shared-components/loading-spinner/loading-spinner.module';

@NgModule({
    declarations: [ListComponent],
    imports: [
        CommonModule,
        ListRoutingModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingSpinnerModule,
    ],
})
export class ListModule {}

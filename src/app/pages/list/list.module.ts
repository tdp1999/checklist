import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

// Import Material Components
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [ListComponent],
    imports: [CommonModule, ListRoutingModule, MatCheckboxModule, ReactiveFormsModule, FormsModule],
})
export class ListModule {}

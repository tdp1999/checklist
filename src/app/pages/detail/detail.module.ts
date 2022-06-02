import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';

// Material Modules
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [DetailComponent],
    imports: [CommonModule, DetailRoutingModule, MatCheckboxModule, FormsModule],
})
export class DetailModule {}

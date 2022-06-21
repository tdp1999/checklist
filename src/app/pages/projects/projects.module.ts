import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ProjectsComponent],
    imports: [CommonModule, ProjectsRoutingModule, MatButtonModule],
})
export class ProjectsModule {}

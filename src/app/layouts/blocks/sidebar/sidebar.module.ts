import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';

// Import Material Components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerModule } from 'src/app/shared-components/loading-spinner/loading-spinner.module';

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        RouterModule,
        LoadingSpinnerModule,
    ],
    exports: [SidebarComponent],
})
export class SidebarModule {}

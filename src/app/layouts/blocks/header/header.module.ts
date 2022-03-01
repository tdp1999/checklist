import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

// Import routing module for
import { RouterModule } from '@angular/router';

// Import Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { SidenavService } from 'src/app/common/service/sidenav.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatChipsModule,
        MatButtonModule,
        MatSelectModule,
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    providers: [SidenavService],
})
export class HeaderModule {}

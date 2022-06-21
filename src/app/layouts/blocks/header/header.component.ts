import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/common/service/sidenav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    constructor(private sidenavService: SidenavService) {}

    ngOnInit(): void {}

    toggleSidebar() {
        this.sidenavService.toggleSidebarState();
    }
}

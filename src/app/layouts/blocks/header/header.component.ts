import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/common/service/sidenav.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    foods: any[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    constructor(private sidenavService: SidenavService) {}

    ngOnInit(): void {}

    toggleSidebar() {
        this.sidenavService.toggleSidebarState();
    }
}

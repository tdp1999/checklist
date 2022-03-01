import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/common/service/sidenav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    opened!: boolean;
    subscription!: Subscription;

    constructor(private sidebarService: SidenavService) {}

    ngOnInit(): void {
        this.subscription = this.sidebarService.currentState.subscribe((state) => {
            this.opened = state;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

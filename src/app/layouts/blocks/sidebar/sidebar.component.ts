import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/common/schema/category';
import { SidenavService } from 'src/app/common/service/sidenav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    opened!: boolean;
    subscription!: Subscription;

    categoryList$!: Observable<Category[]>;

    constructor(private sidebarService: SidenavService) {}

    ngOnInit(): void {
        // Toggle sidebar on click
        this.subscription = this.sidebarService.currentState.subscribe((state) => {
            this.opened = state;
        });

        // Load categories
        this.categoryList$ = this.sidebarService.getCategoryList();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

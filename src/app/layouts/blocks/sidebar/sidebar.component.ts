import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/common/schema/category';
import { ApiCategoryAbstractService } from 'src/app/common/service/api/api-category-abstract.service';
import { SidenavService } from 'src/app/common/service/sidenav.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    opened!: boolean;
    // subscription!: Subscription;

    private _sub = new SubSink();

    categoryList$!: Observable<Category[]>;

    constructor(
        private sidebarService: SidenavService,
        private _categoryService: ApiCategoryAbstractService
    ) {}

    ngOnInit(): void {
        // Toggle sidebar on click
        this._sub.sink = this.sidebarService.currentState.subscribe((state) => {
            this.opened = state;
        });

        // Load categories
        this.categoryList$ = this._categoryService.getCategoryList();
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}

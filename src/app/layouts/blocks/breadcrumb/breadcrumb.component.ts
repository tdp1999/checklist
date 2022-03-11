import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/common/schema/breadcrumb';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
    items: BreadcrumbItem[] = [
        {
            label: 'Home',
            slug: '/',
        },
        {
            label: 'About',
            slug: '/about',
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}

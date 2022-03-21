import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbItem } from 'src/app/common/schema/breadcrumb';
import { BreadcrumbService } from 'src/app/common/service/breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs$!: Observable<BreadcrumbItem[]>;

    constructor(private readonly _bS: BreadcrumbService) {}

    ngOnInit(): void {
        this.breadcrumbs$ = this._bS.breadcrumbs$;
    }
}

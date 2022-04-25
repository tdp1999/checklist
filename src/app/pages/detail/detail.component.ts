import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from 'src/app/common/schema/item';
import { ApiItemAbstractService } from 'src/app/common/service/api/api-item-abstract.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
    public item$: Observable<Item> | undefined;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _itemService: ApiItemAbstractService
    ) {}

    ngOnInit(): void {
        this.item$ = this._activatedRoute.params.pipe(
            switchMap((params) => {
                if (!params.id) {
                    this._router.navigate(['/checklist']);
                    return EMPTY;
                }
                return this._itemService.retrieveItem(params.id);
            })
        );
    }
}

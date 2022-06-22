import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/common/schema/item';
import { ApiItemAbstractService } from 'src/app/common/service/api/abstract/item.abstract.service';
import { HighlightService } from 'src/app/common/service/highlight.service';
import { SidenavService } from 'src/app/common/service/sidenav.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // encapsulation: ViewEncapsulation.None,
})
export class DetailComponent implements OnInit, AfterViewChecked {
    public item$: Observable<Item> | undefined;

    public markAsDone = false;
    private _highlighted = false;
    private _isDataLoaded = false;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _itemService: ApiItemAbstractService,
        private _snackbar: MatSnackBar,
        private _sidenavService: SidenavService,
        private _highlightService: HighlightService
    ) {}

    ngOnInit(): void {
        this.item$ = this._activatedRoute.params.pipe(
            switchMap((params) => {
                if (!params.item) {
                    this._router.navigate(['/checklist']);
                    return EMPTY;
                }
                return this._itemService.retrieveItemBySlug(params.item).pipe(
                    map((data: [Item] | []) => {
                        if (data.length === 0) {
                            this._router.navigate(['/checklist']);
                            return {} as Item;
                        }
                        this.markAsDone = data[0].isDone;
                        return data[0];
                    }),
                    tap((data: Item) => {
                        this._isDataLoaded = true;
                    })
                );
            })
        );
    }

    ngAfterViewChecked(): void {
        if (!this._highlighted && this._isDataLoaded) {
            this._highlightService.highlightAll();
            this._highlighted = true;
        }
    }

    onStateChanges(item: Item) {
        item.isDone = this.markAsDone;
        this._itemService.patchItem(item, item.categoryID).subscribe((data: any) => {
            this._sidenavService.remindToReloadCategory();
            this._snackbar.open('Item updated', 'Dismiss', {
                duration: 2000,
            });
        });
    }
}

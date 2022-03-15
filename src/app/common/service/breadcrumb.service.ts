import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbItem } from '../schema/breadcrumb';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbService {
    // Subject emitting the breadcrumb hierarchy
    private readonly _breadcrumbs$ = new BehaviorSubject<BreadcrumbItem[]>([]);

    // Observable exposing the breadcrumb hierarchy
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private _router: Router) {
        this._router.events
            .pipe(
                // Filter the NavigationEnd events as the breadcrumb is updated only when the route reached its end.
                filter((event) => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                // Construct the breadcrumb hierarchy from the route snapshot
                const root = this._router.routerState.snapshot.root.children[0];

                const breadcrumbs: BreadcrumbItem[] = [];
                this._addBreadcrumb(root, [], breadcrumbs);

                // Emit new breadcrumb hierarchy
                this._breadcrumbs$.next(breadcrumbs);
            });
    }

    private _addBreadcrumb(
        route: ActivatedRouteSnapshot,
        parentUrl: string[],
        breadcrumbs: BreadcrumbItem[]
    ) {
        if (route) {
            // Contruct the breadcrumb URL from the route
            const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

            // Add breadcrumb to the list
            if (route.data.breadcrumb && route.url.length > 0) {
                const breadcrumb = {
                    label: this._getLabel(route.data),
                    url: '/' + routeUrl.join('/'),
                };

                breadcrumbs.push(breadcrumb);
            }

            // Add another element for the next route part
            if (route.firstChild) {
                this._addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
            }
        }
    }

    private _getLabel(data: Data) {
        // The breadcrumb label can be defined as a static string or a function
        return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
    }
}

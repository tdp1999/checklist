import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiHttpService } from './api/api-http.service';

@Injectable()
export class SidenavService {
    private isSidebarOpen = new BehaviorSubject<boolean>(true);
    public currentState = this.isSidebarOpen.asObservable();

    constructor(private _api: ApiHttpService) {}

    toggleSidebarState() {
        this.isSidebarOpen.next(!this.isSidebarOpen.value);
    }

    getCategoryList() {
        return this._api.get('category');
    }
}

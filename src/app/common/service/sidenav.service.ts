import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SidenavService {
    private isSidebarOpen = new BehaviorSubject<boolean>(true);
    public currentState = this.isSidebarOpen.asObservable();

    private reloadCategory = new BehaviorSubject<boolean>(true);
    public reloadCategoryObs = this.reloadCategory.asObservable();

    constructor() {}

    toggleSidebarState() {
        this.isSidebarOpen.next(!this.isSidebarOpen.value);
    }

    remindToReloadCategory() {
        this.reloadCategory.next(true);
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidenavService {
    private isSidebarOpen = new BehaviorSubject<boolean>(true);
    public currentState = this.isSidebarOpen.asObservable();

    constructor() {}

    toggleSidebarState() {
        console.log('toggle!', this.isSidebarOpen.value);
        this.isSidebarOpen.next(!this.isSidebarOpen.value);
    }
}

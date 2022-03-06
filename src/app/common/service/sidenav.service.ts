import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../schema/category';

@Injectable()
export class SidenavService {
    private _url = environment.apiUrl;
    private isSidebarOpen = new BehaviorSubject<boolean>(true);
    public currentState = this.isSidebarOpen.asObservable();

    constructor(private _httpClient: HttpClient) {}

    toggleSidebarState() {
        this.isSidebarOpen.next(!this.isSidebarOpen.value);
    }

    getCategoryList() {
        return this._httpClient.get<Category[]>(`${this._url}/category`);
    }
}

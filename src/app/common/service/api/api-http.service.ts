import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiHttpService {
    private _url = environment.apiUrl;

    constructor(private _httpClient: HttpClient) {}

    /**
     * @function get
     * @param {string} url
     * @param {any} option
     * @returns Observable<any>
     * @see https://stackoverflow.com/questions/60972063/type-observablehttpeventt-is-not-assignable-to-type-observablet
     */
    public get = (url: string, option?: any): Observable<any> =>
        this._httpClient.get(`${this._url}/${url}`, option);

    /**
     * @function post
     * @param {string} url
     * @param {any} data
     * @param {any} option
     * @returns Observable<any>
     */
    public post = (url: string, data: any, option?: any): Observable<any> =>
        this._httpClient.post(`${this._url}/${url}`, data, option);

    /**
     *
     * @param {string} url
     * @param {any} data
     * @param {any} option
     * @returns {Observable<any>} Observable<any>
     */
    public put = (url: string, data: any, option?: any): Observable<any> =>
        this._httpClient.put(`${this._url}/${url}`, data, option);

    /**
     * @function delete
     * @param {string} url
     * @param {any} option
     * @returns {Observable<any>} Observable<any>
     */
    public delete = (url: string, option?: any): Observable<any> =>
        this._httpClient.delete(`${this._url}/${url}`, option);
}

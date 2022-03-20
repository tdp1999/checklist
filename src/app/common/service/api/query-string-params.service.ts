import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class QueryStringParamsService {
    constructor() {}

    // Take an array of key-value pairs and return a query string
    public toString = (params: { key: string; value: Object }[]): string => {
        // Encode the values to avoid special characters
        params.forEach((param) => (param.value = encodeURIComponent(param.value.toString())));

        return params.map((param) => `${param.key}=${param.value}`).join('&');
    };
}

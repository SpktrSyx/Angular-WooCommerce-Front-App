import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiWc } from 'src/environments/apiWoocommerce';
import { Product } from '../models/order/product';

@Injectable({
    providedIn: 'root'
})
export class ProductListService {
    private productList: Product[] = []

    constructor(
        private http: HttpClient
    ) {

    }

    public get(): Promise<Product[]> {
        return this.http.get<Product[]>(`${apiWc.apiUrl}/${apiWc.version}/products/?per_page=30&consumer_key=${apiWc.consumerKey}&consumer_secret=${apiWc.consumerSecret}`)
            .toPromise();
    }

}

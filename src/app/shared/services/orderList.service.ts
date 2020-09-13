import { Injectable } from '@angular/core';
import { Order } from '../models/order/order';
import { HttpClient } from '@angular/common/http';
import { apiWc } from 'src/environments/apiWoocommerce';

@Injectable({
    providedIn: 'root'
})
export class OrderListService {
    private orderList: Order[] = []

    constructor(
        private http: HttpClient
    ) {

    }

    public get(): Promise<Order[]> {
        return this.http.get<Order[]>(`${apiWc.apiUrl}/${apiWc.version}/orders/?per_page=30&status=on-hold+completed&consumer_key=${apiWc.consumerKey}&consumer_secret=${apiWc.consumerSecret}`)
            .toPromise();
    }

}

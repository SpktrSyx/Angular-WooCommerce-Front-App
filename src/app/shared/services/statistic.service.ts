import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiWc } from 'src/environments/apiWoocommerce';
import { Sales } from '../models/statistic/sales';

@Injectable({
    providedIn: 'root'
})
export class StatisticService {


    constructor(
        private http: HttpClient
    ) {
       
    }

    public get(year: number): Promise<Sales[]> {
        return this.http.get<Sales[]>(`${apiWc.apiUrl}/${apiWc.version}/reports/sales?date_min=${year}-01-01&date_max=${year}-12-31&consumer_key=${apiWc.consumerKey}&consumer_secret=${apiWc.consumerSecret}`)
            .toPromise();
    }

}

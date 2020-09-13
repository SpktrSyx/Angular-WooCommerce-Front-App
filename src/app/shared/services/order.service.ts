import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiWc } from 'src/environments/apiWoocommerce';
import { Order } from '../models/order/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private order: Order;
    constructor(
        private http: HttpClient
    ) {

    }

    // afficher les données d'une seule commande
    public get(id: number): Promise<Order> {
        return this.http.get<Order>(`${apiWc.apiUrl}/${apiWc.version}/orders/${id}/?consumer_key=${apiWc.consumerKey}&consumer_secret=${apiWc.consumerSecret}`)
            .toPromise();
    }

    // passer du statut de commande "en attente" à "complète"
    public update(id: number, status: string): Promise<any> {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');

        return this.http.post<any>(`${apiWc.apiUrl}/${apiWc.version}/orders/${id}/?status=${status}&consumer_key=${apiWc.consumerKey}&consumer_secret=${apiWc.consumerSecret}`,
            [],
            { headers }
        )
            .toPromise();
    }

    // utile pour ajouter une note et en particulier le numéro de suivi 
    // si customer_note=true le client recevra automatiquement un mail avec cette note
    public addNote(id: number, notes: string, mailClient: boolean): Promise<any> {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');

        return this.http.post<any>(`${apiWc.apiUrl}/${apiWc.version}/orders/${id}/notes/?note=${notes}&customer_note=${mailClient}&consumer_key=${apiWc.consumerKey}&consumer_secret=${apiWc.consumerSecret}`,
            [],
            { headers }
        )
            .toPromise();
    }

}

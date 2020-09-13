import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiBdd } from 'src/environments/apiBdd';

@Injectable({
    providedIn: 'root'
})
export class ApiBackOfficeService {

    constructor(
        private http: HttpClient
    ) {

    }

    // BDD user
    authUser(userForm:any) {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "logUser",
            data: userForm
        }

        return new Promise((resolve, reject) => {
            this.http.post(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

    getAllUser() {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "getAllUser"
        }

        return new Promise((resolve, reject) => {
            this.http.post(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

    createUser(userInfos: []) {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "createUser",
            data: userInfos,
        }
        return new Promise((resolve, reject) => {
            this.http.put(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

    disableUser(id: number) {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "disableUser",
            data: {
                'id': id
            }
        }

        return new Promise((resolve, reject) => {
            this.http.put(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

    updateUser(access: number, id: number) {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "updateUser",
            data: {
                'id': id,
                'access': access
            }
        }

        return new Promise((resolve, reject) => {
            this.http.put(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

    // BDD user_tracking_order_url

    getAllShippingTracking() {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "getListTracking"
        }

        return new Promise((resolve, reject) => {
            this.http.put(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

    createTrackingUrl(orderId: number, trackingUrl: string, trackingNumber: string) {

        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        const postData = {
            requestType: "createTrackingOrder",
            data: {
                // a changer quand auth login sera fait
                'user_id': localStorage['id'],
                'order_id': orderId,
                'tracking_url': trackingUrl,
                'tracking_number': trackingNumber
            }
        }

        return new Promise((resolve, reject) => {
            this.http.put(apiBdd.proxy + apiBdd.url,
                JSON.stringify(postData),
                { headers })
                .subscribe(response => {
                    resolve(response);
                },
                    (error) => {
                        reject(error);
                    })
        }
        )
    }

}

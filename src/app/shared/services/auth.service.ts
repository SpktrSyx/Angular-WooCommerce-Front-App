import { Injectable } from '@angular/core';
import { User } from '../models/account/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {

    }

    public login(userInfos: User) {
        localStorage.setItem('ACCESS_TOKEN', "access_token");
        localStorage.setItem('mail', userInfos.mail);
        localStorage.setItem('access', String(userInfos.access));
        localStorage.setItem('name', userInfos.name);
        localStorage.setItem('id', String(userInfos.id));
    }

    public isLogged() {
        return localStorage.getItem('ACCESS_TOKEN') !== null;

    }

    public logout() {
        localStorage.removeItem('ACCESS_TOKEN');
    }
}

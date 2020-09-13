import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(
        private toastController: ToastController,
        private loadingCtrl: LoadingController,
    ) {

    }
    async presentToast(message: string, perso: string) {
        const toast = await this.toastController.create({
            message: message,
            position: 'middle',
            duration: 2000,
            cssClass: perso,
        });
        toast.present();
    }

    async popLoad(message: string) {

        const loadingElement = await this.loadingCtrl.create({
            message: message,
            spinner: 'crescent'
        });

        return await loadingElement.present();
    }
}

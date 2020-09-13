import { Component } from '@angular/core';
import { Platform, IonTabs, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private modalCtrl: ModalController,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.openLoginModal();
        });
    }


    async openLoginModal() {
        const modal = await this.modalCtrl.create({
            component: LoginComponent,
            // cssClass: 'card-modal',
        });

        modal.onWillDismiss().then(() => {

        });

        await modal.present();
    }


}

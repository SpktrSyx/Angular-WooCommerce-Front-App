import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiBackOfficeService } from '../shared/services/api-back-office.service';
import { User } from '../shared/models/account/user';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { AccountModalComponent } from './accountModal/accountModal/accountModal.component';
import { MessageService } from '../shared/services/message.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements AfterViewInit {
    private userList: User[];
    private access: number;

    constructor(
        private titleService: Title,
        private backService: ApiBackOfficeService,
        private authService: AuthService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.titleService.setTitle('Comptes');
        this.retrieveAll();
        
    }

    ngAfterViewInit() {

    }

    private retrieveAll() {
        this.backService.getAllUser()
            .then((data: any) => {
                if (data.requestSql === true) {
                    this.userList = data.data;
                }
            })
            .catch((error) => {
                this.messageService.presentToast('Impossible de récupérer la liste des comptes', 'error');
                console.log(error)
            });
        }

    async logout(id: number) {
        const alert = await this.alertCtrl.create({
            header: 'Êtes-vous sûr(e) de vouloir vous déconnecter ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Valider',
                    handler: (data) => {
                     this.logoutUser();
                    },
                }
            ]
        });

        alert.present();
    }


    async updateAlert(id: number) {
        const alert = await this.alertCtrl.create({
            header: 'Niveau d\'accès :',
            inputs: [
                {
                    name: 'Niveau 1',
                    type: 'radio',
                    label: '1',
                    value: 1
                },
                {
                    name: 'Niveau 2',
                    type: 'radio',
                    label: '2',
                    value: 2
                },
                {
                    name: 'Niveau 3',
                    type: 'radio',
                    label: '3',
                    value: 3
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Valider',
                    handler: (data) => {
                        this.access = data;
                        this.messageService.popLoad('En attente');
                        this.backService.updateUser(this.access, id)
                            .then((response: any) => {
                                if (response.requestSql === true) {
                                    this.loadingCtrl.dismiss();
                                    for (let user of this.userList) {
                                        if (id === user.id) {
                                            user.access = this.access;
                                        }
                                    }
                                }
                                if (response.requestSql === false) {
                                    this.loadingCtrl.dismiss();
                                    this.messageService.presentToast('Un problème a été rencontré lors de la mise à jour', 'error');
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                this.loadingCtrl.dismiss();
                            })
                    },
                }
            ]
        });

        alert.present();
    }

    async deleteAlert(id: number) {
        const alert = await this.alertCtrl.create({
            header: 'Êtes-vous sûr(e) de vouloir supprimer ce compte ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Valider',
                    handler: (data) => {
                        this.messageService.popLoad('En attente');
                        this.backService.disableUser(id)
                            .then((response: any) => {
                                if (response.requestSql === true) {
                                    this.loadingCtrl.dismiss();
                                    for (let i = 0; i < this.userList.length; i++) {
                                        if (id === this.userList[i].id) {
                                            try {
                                                this.userList.splice(i, 1);
                                                this.messageService.presentToast('Compte supprimé avec succès !', 'ok');
                                            } catch (e) {
                                                console.error(e)
                                            }
                                        }
                                    }
                                }
                                if (response.requestSql === false) {
                                    this.loadingCtrl.dismiss();
                                    this.messageService.presentToast('Un problème a été rencontré lors de la suppression', 'error');
                                }
                            })
                            .catch((error) => { 
                                console.log(error)
                                this.loadingCtrl.dismiss();
                            })
                    },
                }
            ]
        });

        alert.present();
    }

    logoutUser(){
        this.authService.logout();
        this.openLoginModal();
      }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: AccountModalComponent,
            cssClass: 'card-modal',
        });

        modal.onWillDismiss().then((newUser) => {
            if(newUser.data != undefined){
            const tabIndex = this.userList.length;
            this.userList.splice(tabIndex, 1, newUser.data);
            }
        });

        await modal.present();
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

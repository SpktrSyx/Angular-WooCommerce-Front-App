import { Component, AfterViewInit, Input } from '@angular/core';
import { Order } from '../shared/models/order/order';
import { OrderListService } from '../shared/services/orderList.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { OrderModalComponent } from './orderModal/orderModal.component';
import { OrderService } from '../shared/services/order.service';
import { MessageService } from '../shared/services/message.service';
import { ApiBackOfficeService } from '../shared/services/api-back-office.service';
import { Tracking } from '../shared/models/order/tracking';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements AfterViewInit {
    private orderList: Order[];
    private resetData: Order[];
    private trackingList: Tracking[];
    private resetTracking: Tracking[];

    constructor(
        private orderListService: OrderListService,
        private orderService: OrderService,
        private modalCtrl: ModalController,
        private titleService: Title,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private messageService: MessageService,
        private backService: ApiBackOfficeService
    ) {

        this.titleService.setTitle('Commandes');
        this.retrieveAll();

    }

    ngAfterViewInit() {

    }


    private retrieveAll() {
        //Lister toutes les commandes
        this.orderListService.get()
            .then((data: Order[]) => {
                this.orderList = data;
                this.resetData = data;
                this.backService.getAllShippingTracking()
                    .then((data: any) => {
                        this.trackingList = data.data;
                        // this.resetTracking = data.data;
                    })
                    .catch((error) => {
                        this.messageService.presentToast('Impossible de récupérer la liste des numéros de suivis', 'error');
                        console.log(error)
                    });
            })
            .catch((error) => {
                this.messageService.presentToast('Impossible de récupérer la liste des commandes', 'error');
                console.log(error)
            });
    }

    // Trier l'affichage en fonction du statut des commandes
    show(status: string) {
        this.orderList = this.resetData;
        const allData = this.orderList;

        if (status === 'all') {
            this.retrieveAll();
        }
        else if (status === 'todo') {
            this.orderList = allData.filter(i => i.status === 'on-hold');
        }
        else if (status === 'done') {
            this.orderList = allData.filter(i => i.status === 'completed');
        }

        if (typeof this.orderList === 'undefined') {
            return null;
        }
        return this.orderList;
    }

    // procédure pour marquer la commande comme complète dans l'API (envoyée)
    // rafraichit l'affichage en modifiant le statut + ajout du numéro de suivi dans API?? + affichage

    async askForTracking(orderId: number) {
        const alert = await this.alertCtrl.create({
            header: 'Veuillez entrer le numéro de suivi :',
            message: "Cliquez sur 'Valider' pour continuer sans numéro de suivi",
            inputs: [
                {
                    name: 'shipping',
                    type: 'text',
                    label: 'N°',
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
                    handler: (data: any) => {
                        const trackingNumber = data.shipping;
                        if (trackingNumber === "") {
                            this.askIfOk(orderId);
                        } else {
                            let trackingUrl: string = 'https://www.laposte.fr/outils/suivre-vos-envois?code=' + trackingNumber;
                            this.messageService.popLoad('En attente');
                            this.markAsCompleted(orderId, trackingNumber);
                            this.addTrackingUrlInBackService(orderId, trackingUrl, trackingNumber);
                            this.sendTrackingNumber(orderId, trackingNumber);
                            this.loadingCtrl.dismiss();
                            this.retrieveAll();
                        }
                    },
                }
            ]
        });

        alert.present();
    }


    async askIfOk(orderId: number, trackingNumber?: string) {
        const alert = await this.alertCtrl.create({
            header: 'Etes vous sûr(e) de vouloir valider sans numéro de suivi ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.askForTracking(orderId);
                    }
                }, {
                    text: 'Oui',
                    handler: (data: string) => {
                        this.messageService.popLoad('En attente');
                        this.markAsCompleted(orderId, trackingNumber);
                    },
                }
            ]
        });

        alert.present();
    }

    // ajouter le numero de suivi dans une note dans l'API
    // mail automatique à l'acheteur
    sendTrackingNumber(orderId: number, trackingNumber: string) {
        let message_tracking = '<p>Pour suivre votre colis, cliquez sur ce lien : ' + '<a href="https://www.laposte.fr/outils/suivre-vos-envois?code=' + trackingNumber + '">' + trackingNumber + '</a></p>';
        this.orderService.addNote(orderId, message_tracking, true)
            .then((data) => {
                let note = data;
                console.log(note);
            })
            .catch((error) => {
                this.loadingCtrl.dismiss();
                this.messageService.presentToast('Un problème a été rencontré lors de l\'envoi des données' + error, 'error');
            })
    }

    // ajouter le numéro de tracking au backservice pour les retrouver plus facilement
    addTrackingUrlInBackService(orderId: number, trackingUrl: string, trackingNumber: string) {
        this.backService.createTrackingUrl(orderId, trackingUrl, trackingNumber)
            .then((data) => { console.log(data); })
            .catch((error) => {
                this.loadingCtrl.dismiss();
                this.messageService.presentToast('Un problème a été rencontré lors de la mise à jour du numéro de suivi' + error, 'error');
            })
    }

    // changer le statut de la commande à "complète"
    // mettre à jour l'affichage
    markAsCompleted(orderId: number, trackingNumber: string) {
        const status = 'completed';
        this.orderService.update(orderId, status)
            .then((onSuccess: any) => {
                if (onSuccess.status === 'completed') {
                    this.loadingCtrl.dismiss();
                    for (let order of this.orderList) {
                        if (onSuccess.id === order.id) {
                            order.status = 'completed';
                        }
                    }
                }
            })
            .catch((error) => {
                this.loadingCtrl.dismiss();
                this.messageService.presentToast('Un problème a été rencontré lors du changement de statut de la commande' + error, 'error');
            })
    }

    // ouverture du modal avec les informations de la commande passée
    // COMMENT INTEGRER TRACKINGID ??
    async openModal(order: any) {
        const modal = await this.modalCtrl.create({
            component: OrderModalComponent,
            componentProps: {
                order: order
            }
        });

        modal.onWillDismiss().then((orderUpdated: any) => {
            if (orderUpdated.data != undefined && orderUpdated.data.status === 'completed') {
                for (let order of this.orderList) {
                    if (orderUpdated.data.id === order.id) {
                        order.status = 'completed';
                    }
                }
            }
        });

        await modal.present();
    }

    // contacter le client par mail = ouvre la boîte mail par défaut avec mail client, id commande + objet du mail
    openToMail(consumerMail: string, orderId: number) {
        window.location.href = `mailto:${consumerMail}?subject=commande%20n°%20${orderId}%20sur%20Calligraphies-Arabes.fr`;
    }



}

import { Component, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/models/order/order';
import { NavParams, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { MessageService } from 'src/app/shared/services/message.service';
import { ApiBackOfficeService } from 'src/app/shared/services/api-back-office.service';


@Component({
    selector: 'app-orderModal',
    templateUrl: './orderModal.component.html',
    styleUrls: ['./orderModal.component.css']
})
export class OrderModalComponent implements AfterViewInit {
    private order: Order;
    private orderId: number;

    constructor(
        private orderService: OrderService,
        private modalCtrl: ModalController,
        private navParam: NavParams,
        private printer: Printer,
        private messageService: MessageService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private backService: ApiBackOfficeService,
    ) {
        const modal = this.modalCtrl;
        let order = this.navParam.get('order');
        this.orderId = order.id;
    }

    ngAfterViewInit() {

    }

    // sur mobile
    openToMail(consumerMail: string, orderId: number) {
        window.location.href = `mailto:${consumerMail}?subject=commande%20n°%20${orderId}%20sur%20Calligraphies-Arabes.fr`;
    }

    // imprimer le document contenu du modal
    // sur mobile
    printOrder() {
        const printContent = document.getElementById('print-page');
        this.printer.isAvailable().then(
            (onSuccess) => {
                this.printer.print(printContent.outerHTML);
            },
            (error) => {
                this.messageService.presentToast('Impossible d\'imprimer le document' + error, 'error');
            })

        // sur pc pour test
        // console.log('window')
        // window.print();

    }

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
                            console.log(trackingNumber, orderId);
                            let trackingUrl: string = 'https://www.laposte.fr/outils/suivre-vos-envois?code=' + trackingNumber;
                            this.messageService.popLoad('En attente');
                            this.markAsCompleted(orderId);
                            this.addTrackingUrlInBackService(orderId, trackingUrl, trackingNumber);
                            this.sendTrackingNumber(orderId, trackingNumber);
                            this.loadingCtrl.dismiss();
                            this.closeModal(orderId);
                        }
                    },
                }
            ]
        });

        alert.present();
    }


    async askIfOk(orderId: number) {
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
                        
                        this.markAsCompleted(orderId);
                    },
                }
            ]
        });

        alert.present();
    }

// ajouter le numero de suivi dans une note dans l'API
// mail automatique à l'acheteur
    sendTrackingNumber(orderId: number, trackingNumber: string) {
        let message_tracking = '<p>Pour suivre votre colis, cliquez sur ce lien : ' + '<a href="https://www.laposte.fr/outils/suivre-vos-envois?code=' + trackingNumber + '">' + trackingNumber + '</a></p>' ;
        this.orderService.addNote(orderId, message_tracking, true)
        .then((data) => { 
            let note = data ; 
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
// fermer le modal
    markAsCompleted(orderId: number) {
        const status = 'completed';
        this.orderService.update(orderId, status)
            .then(
                (onSuccess: any) => {
                    this.loadingCtrl.dismiss();
                    this.closeModal(onSuccess);
                })
                .catch((error) => {
                    this.loadingCtrl.dismiss();
                    this.messageService.presentToast('Un problème a été rencontré lors du changement de statut de la commande' + error, 'error');
                    this.closeModal(error);
                    console.log(error)
                });

    }

    async closeModal(orderId: number) {
        await this.modalCtrl.dismiss(orderId).then();
    }

}

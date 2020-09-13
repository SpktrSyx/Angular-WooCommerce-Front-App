import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ProductListService } from '../shared/services/productList.service';
import { ProductModalComponent } from './productModal/productModal/productModal.component';
import { Product } from '../shared/models/order/product';
import { MessageService } from '../shared/services/message.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit {
    private productList: Product[];

    constructor(
        private titleService: Title,
        private productListService: ProductListService,
        private modalCtrl: ModalController,
        private messageService: MessageService
    ) {
        this.titleService.setTitle('Produits');
        this.retrieveAll();

    }
    
    private retrieveAll() {
        this.productListService.get()
            .then((data: Product[]) => {
                this.productList = data, console.log(this.productList)
            })
            .catch((error) => {
                this.messageService.presentToast('Impossible de récupérer la liste des produits', 'error');
                console.log(error)
            });
    }

    async openModal(id: number) {
        const modal = await this.modalCtrl.create({
            component: ProductModalComponent,
            componentProps: {
                productId: id
            }
        });

        modal.onWillDismiss().then((data) => {

        });

        await modal.present();
    }

    ngAfterViewInit() {

    }

}

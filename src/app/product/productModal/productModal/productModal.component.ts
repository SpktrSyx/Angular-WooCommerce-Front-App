import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/shared/models/order/product';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
    selector: 'app-productModal',
    templateUrl: './productModal.component.html',
    styleUrls: ['./productModal.component.css']
})
export class ProductModalComponent implements AfterViewInit {
    private product: Product;
    private productForm: FormGroup;

    constructor(
        private modalCtrl: ModalController,
        private navParam: NavParams,
        private productService: ProductService,
        private formBuilder: FormBuilder,
    ) {
        const modal = this.modalCtrl;
        let productId = this.navParam.get('productId');
        this.productForm = new FormGroup({
            name: new FormControl (),
            price: new FormControl (),
            shipping: new FormControl (),
            img: new FormControl (),
            newAttribute: new FormControl (),
            variations: new FormControl (),
            description: new FormControl (),
            categorie: new FormControl (),
            addOnPlatform: new FormControl (),
        });
    }
    async closeModal() {
        await this.modalCtrl.dismiss().then();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.productForm = this.formBuilder.group({
                'name': [, Validators.required],
                'price': [, Validators.required],
                'shipping': [, Validators],
                'img': [, Validators.required],
                'newAttribute': [, Validators],
                'variations': [, Validators.required],
                'visual': [, Validators.required],
                'description': [, Validators.required],
                'categorie': [, Validators.required],
                'addOnPlatform': [, Validators.required],
            });
        });
    }

}

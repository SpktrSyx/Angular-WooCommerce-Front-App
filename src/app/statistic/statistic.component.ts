import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StatisticModalComponent } from './statisticModal/statisticModal.component';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements AfterViewInit {
    private yearForm: FormGroup;

    constructor(
        private titleService: Title,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
    ) {
        this.titleService.setTitle('Statistiques');
        this.yearForm = new FormGroup({
            year: new FormControl ()
        });
    }

    async openModal(id: number) {
        const modal = await this.modalCtrl.create({
            component: StatisticModalComponent,
            componentProps: {
                year : this.yearForm.get("year").value
            }
        });

        modal.onWillDismiss().then((data) => {
            
        });

        await modal.present();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.yearForm = this.formBuilder.group({
                'year': [, Validators.required]
            });
        });
    }

}


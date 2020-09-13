import { Component, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiBackOfficeService } from 'src/app/shared/services/api-back-office.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/shared/models/account/user';

import { MessageService } from 'src/app/shared/services/message.service';

@Component({
    selector: 'app-accountModal',
    templateUrl: './accountModal.component.html',
    styleUrls: ['./accountModal.component.css']
})
export class AccountModalComponent implements AfterViewInit {
    private userForm: FormGroup;

    constructor(
        private modalCtrl: ModalController,
        private titleService: Title,
        private backService: ApiBackOfficeService,
        private messageService: MessageService
    ) {
        const modal = this.modalCtrl;
        this.titleService.setTitle('Nouveau compte');
        this.userForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            access: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        });
    }

    // Pour récupérer les infos du compte créé une fois le modal fermé
    async closeModal(newUser: any) {
        await this.modalCtrl.dismiss({
            0: newUser.id,
            1: newUser.name,
            2: newUser.mail, 
            3: newUser.access,
            4: newUser.creation_date,
            access: newUser.access,
            id: newUser.id,
            mail: newUser.mail,
            name: newUser.name,
            creation_date: newUser.creation_date,
          }).then();
    }

    async cancel() {
        await this.modalCtrl.dismiss().then();
    }

    saveUser() {
        this.backService.createUser(this.userForm.value)
            .then((response: any) => { 
                if (response.requestSql === true) {
                    this.messageService.presentToast('Création réussie !', 'ok');
                    const date = new Date();
                    const newUser: User = {
                        access: this.userForm.value.access,
                        id: response.accountId,
                        mail: this.userForm.value.email,
                        name: this.userForm.value.name,
                        creation_date: date
                    };
                    this.closeModal(newUser);
                }
                if (response.requestSql === false) {
                    const dataError: any = {
                        requestSql: false
                    }
                    this.closeModal(dataError);
                    this.messageService.presentToast('Un problème a été rencontré', 'error')
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
    ngAfterViewInit() {

    }

}

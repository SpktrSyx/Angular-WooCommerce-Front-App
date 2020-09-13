import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiBackOfficeService } from 'src/app/shared/services/api-back-office.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private loginForm: FormGroup;
    isSubmitted = false;

    constructor(
        private titleService: Title,
        private authService: AuthService,
        private backService: ApiBackOfficeService,
        private messageService: MessageService,
        private router: Router,
        private modalCtrl: ModalController,
        private navParam: NavParams,
    ) {
        this.titleService.setTitle('Se connecter');
        const modal = this.modalCtrl;
        let login = this.navParam.get('login');



        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    async closeModal(login: any) {
        await this.modalCtrl.dismiss(login).then();
    }

    // get formControls() {
    //     return this.loginForm.controls;
    // }

    login() {
        this.backService.authUser(this.loginForm.value)
            .then((userData: any) => {
                   if (this.loginForm.invalid) {
                        return;
                    }
                if (userData.requestSql === true) {
                    this.isSubmitted = true;
                    this.authService.login(userData.data);
                    this.messageService.presentToast('Bienvenue', 'ok');
                    this.router.navigate(['order']);
                    this.closeModal('ok');
                }
                if (userData.requestSql === false) {
                    this.messageService.presentToast('Les identifiants sont incorrects', 'error');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    ngOnInit() {

    }

}

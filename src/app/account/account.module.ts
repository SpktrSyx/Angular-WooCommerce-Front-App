import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountModalComponent } from './accountModal/accountModal/accountModal.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    AccountModalComponent
  ]
})
export class AccountModule { }

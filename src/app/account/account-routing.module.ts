import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: "account", component: AccountComponent, data: {title: 'Comptes'}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AccountRoutingModule { }
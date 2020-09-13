import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: "order", component: OrderComponent, data: {title: 'Commandes'}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class OrderRoutingModule { }
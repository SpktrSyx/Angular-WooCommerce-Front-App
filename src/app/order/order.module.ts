import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderModalComponent } from './orderModal/orderModal.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ],
})
export class OrderModule { }

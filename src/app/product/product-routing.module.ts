import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: "product", component: ProductComponent, data: {title: 'Produits'}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ProductRoutingModule { }
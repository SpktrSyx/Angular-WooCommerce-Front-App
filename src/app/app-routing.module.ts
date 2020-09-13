import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: "**", pathMatch: 'full', redirectTo: "login" },
    { path: "login", component: LoginComponent },
    { path: "order", component: OrderComponent },
    { path: "product", component: ProductComponent },
    { path: "statistic", component: StatisticComponent },
    { path: "account", component: AccountComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }

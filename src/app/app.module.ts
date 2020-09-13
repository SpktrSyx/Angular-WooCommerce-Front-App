import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Printer } from '@ionic-native/printer/ngx';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { StatisticModule } from './statistic/statistic.module';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderModalComponent } from './order/orderModal/orderModal.component';
import { StatisticModalComponent } from './statistic/statisticModal/statisticModal.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ProductModalComponent } from './product/productModal/productModal/productModal.component';
import { AccountModalComponent } from './account/accountModal/accountModal/accountModal.component';
import { LoginModule } from './login/login.module';

@NgModule({
   declarations: [
      AppComponent
   ],
   entryComponents: [
      OrderModalComponent,
      ProductModalComponent,
      StatisticModalComponent,
      AccountModalComponent
   ],
   imports: [
      BrowserModule,
      SharedModule,
      LoginModule,
      OrderModule,
      ProductModule,
      StatisticModule,
      AccountModule,
      AppRoutingModule,
      GoogleChartsModule.forRoot(),
      HttpClientModule
   ],
   providers: [
      StatusBar,
      SplashScreen,
      Printer,
      NavParams,
      Title
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}

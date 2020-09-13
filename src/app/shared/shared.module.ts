import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    
  ],
  exports: [
    IonicModule,
    HttpClientModule,
    RouterModule,
    GoogleChartsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

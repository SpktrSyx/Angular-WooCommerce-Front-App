import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path: "statistic", component: StatisticComponent, data: {title: 'Statistiques'}
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class StatisticRoutingModule { }

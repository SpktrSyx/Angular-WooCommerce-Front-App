import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import { SharedModule } from '../shared/shared.module';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticModalComponent } from './statisticModal/statisticModal.component';

@NgModule({
  declarations: [
    StatisticComponent,
    StatisticModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticRoutingModule
  ],
})
export class StatisticModule { }

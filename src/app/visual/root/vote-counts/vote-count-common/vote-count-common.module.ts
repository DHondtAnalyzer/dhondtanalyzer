import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoteCountTableComponent} from './vote-count-table/vote-count-table.component';
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {VoteCountPieChartComponent} from './vote-count-pie-chart/vote-count-pie-chart.component';
import {ChartsModule} from "ng2-charts";
import { VoteCountSummaryComponent } from './vote-count-summary/vote-count-summary.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxDatatableModule,
    ChartsModule,
  ],

  declarations: [
    VoteCountTableComponent,
    VoteCountPieChartComponent,
    VoteCountSummaryComponent,
  ],
  exports: [
    VoteCountTableComponent,
    VoteCountPieChartComponent,
    VoteCountSummaryComponent,
  ]
})
export class VoteCountCommonModule {
}

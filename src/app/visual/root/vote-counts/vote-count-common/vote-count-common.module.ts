import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoteCountTableComponent} from './vote-count-table/vote-count-table.component';
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {VoteCountPieChartComponent} from './vote-count-pie-chart/vote-count-pie-chart.component';
import {ChartsModule} from "ng2-charts";
import { VoteCountSummaryComponent } from './vote-count-summary/vote-count-summary.component';
import { VoteCountPartiesRankingListComponent } from './vote-count-parties-ranking-list/vote-count-parties-ranking-list.component';
import { VoteCountDistrictsRankingListComponent } from './vote-count-districts-ranking-list/vote-count-districts-ranking-list.component';

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
    VoteCountPartiesRankingListComponent,
    VoteCountDistrictsRankingListComponent,
  ],
  exports: [
    VoteCountTableComponent,
    VoteCountPieChartComponent,
    VoteCountSummaryComponent,
  ]
})
export class VoteCountCommonModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoteCountTableComponent} from './vote-count-table/vote-count-table.component';
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxDatatableModule,
  ],

  declarations: [VoteCountTableComponent],
  exports: [VoteCountTableComponent]
})
export class VoteCountCommonModule {
}

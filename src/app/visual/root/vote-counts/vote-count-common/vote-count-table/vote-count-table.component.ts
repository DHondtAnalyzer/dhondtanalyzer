import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-count-table',
  templateUrl: './vote-count-table.component.html',
  styleUrls: ['./vote-count-table.component.css']
})
export class VoteCountTableComponent implements OnInit {

  private _rows: any[];
  private _columns: any[];
  private _loadingIndicator: boolean;

  constructor() {
    setTimeout(() => { this.loadingIndicator = false; }, 5000);
  }

  ngOnInit() {
    this.rows = [
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },
      {
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },{
        name: 'Austin',
        gender: 'Male',
        gender2: 'Male',
        gender3: 'Male',
        gender4: 'Male',
        gender5: 'Male',
        gender6: 'Male',
        gender7: 'Male',
        gender8: 'Male',
        company: 'Swimlane',
      },


    ];
    this.columns = [
      { prop: 'name' },
      { name: 'Gender' },
      { name: 'Gender2' },
      { name: 'Gender3' },
      { name: 'Gender4' },
      { name: 'Gender5' },
      { name: 'Gender6' },
      { name: 'Gender7' },
      { name: 'Gender8' },
      { name: 'Company' }
    ];
    this.loadingIndicator = true;
  }


  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {
    this._rows = value;
  }
  get columns(): any[] {
    return this._columns;
  }

  set columns(value: any[]) {
    this._columns = value;
  }

  get loadingIndicator(): boolean {
    return this._loadingIndicator;
  }

  set loadingIndicator(value: boolean) {
    this._loadingIndicator = value;
  }


}

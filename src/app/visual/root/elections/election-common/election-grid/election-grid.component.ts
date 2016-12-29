import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

import {Election} from "../../../../../dao/model/election";
import {AppListObservable} from "../../../../../dao/app-list-observable";
import {AppList} from "../../../../../dao/app-list";

@Component({
    selector: 'app-election-grid',
    templateUrl: './election-grid.component.html',
    styleUrls: ['./election-grid.component.css']
})
export class ElectionGridComponent implements OnInit {

  private _filteredElectionList: AppList<Election>;

  @Input() electionList: AppList<Election>;
    @Input() searchable: boolean;
    @Input() big: boolean;

    @Output() onView = new EventEmitter<string>();

    constructor() {
    }

  ngOnInit() {
    this.filteredElectionList = this.electionList;
  }

  get filteredElectionList(): AppList<Election> {
    return this._filteredElectionList;
  }

  set filteredElectionList(value: AppList<Election>) {
    this._filteredElectionList = value;
  }

    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param id
     */
    private goToElection(id: string): void {
        this.onView.emit(id);
    }

    get cardColClass(): string {
        if (this.big) {
            return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        } else {
            return 'col-xs-12 col-sm-6 col-md-4';
        }
    }

  search(filtered: AppList<Election>){
      this.filteredElectionList = filtered;
  }
}

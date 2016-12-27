import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

import {Election} from "../../../../../dao/model/election";
import {AppListObservable} from "../../../../../dao/app-list-observable";

@Component({
    selector: 'app-election-grid',
    templateUrl: './election-grid.component.html',
    styleUrls: ['./election-grid.component.css']
})
export class ElectionGridComponent implements OnInit {

    private _filteredElectionList: Election[];

    @Input() electionList: AppListObservable<Election[]>;
    @Input() searchable: boolean;
    @Input() big: boolean;

    @Output() onView = new EventEmitter<Election>();

    constructor() {
    }

    ngOnInit() {
    }

  get filteredElectionList(): Election[] {
    return this._filteredElectionList;
  }

  set filteredElectionList(value: Election[]) {
    this._filteredElectionList = value;
  }

    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param election
     */
    private goToElection(election: Election): void {
        this.onView.emit(election);
    }

    get cardColClass(): string {
        if (this.big) {
            return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        } else {
            return 'col-xs-12 col-sm-6 col-md-4';
        }
    }

  search(filtered: AppListObservable<Election[]>){
    filtered.subscribe(elections => {
      this.filteredElectionList = elections;
    });
  }
}

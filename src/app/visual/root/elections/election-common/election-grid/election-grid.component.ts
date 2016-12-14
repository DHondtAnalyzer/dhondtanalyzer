import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

import {Election} from "../../../../../dao/model/election";

@Component({
    selector: 'app-election-grid',
    templateUrl: './election-grid.component.html',
    styleUrls: ['./election-grid.component.css']
})
export class ElectionGridComponent implements OnInit {

    private filteredElectionList: Election[];

    @Input() electionList: Election[];
    @Input() searchable: boolean;
    @Input() big: boolean;

    @Output() onView = new EventEmitter<Election>();

    constructor(private route: Router) {
    }

    ngOnInit() {
        this.filteredElectionList = this.electionList;
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

    search(filtered: Election[]){
        this.filteredElectionList = filtered;
    }

}

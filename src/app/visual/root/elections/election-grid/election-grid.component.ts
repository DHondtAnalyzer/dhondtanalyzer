import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

import {Election} from "../../../../dao/model/election";

@Component({
    selector: 'app-election-grid',
    templateUrl: './election-grid.component.html',
    styleUrls: ['./election-grid.component.css']
})
export class ElectionGridComponent implements OnInit {

    @Input() electionList: Election[];
    @Output() onRoute = new EventEmitter<void>();

    constructor(private route: Router) {
    }

    ngOnInit() {
    }

    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param election
     */
    private goToElection(election: Election): void {
        this.route.navigate(['/app/elections', election.id]);
        this.onRoute.emit();
    }

}

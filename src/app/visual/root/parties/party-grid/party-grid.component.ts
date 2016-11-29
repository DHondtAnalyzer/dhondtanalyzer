import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Party} from "../../../../dao/model/party";
import {Router} from "@angular/router";

@Component({
    selector: 'app-party-grid',
    templateUrl: './party-grid.component.html',
    styleUrls: ['./party-grid.component.css']
})
export class PartyGridComponent implements OnInit {

    @Input() partyList: Party[];
    @Input() editable: boolean;
    @Output() onRoute = new EventEmitter<void>();

    constructor(private route: Router) {
    }

    ngOnInit() {
    }


    private addParty(): void {
        //this.partyList.push(new District());
    }


    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param party
     */
    private goToParty(party: Party): void {
        this.route.navigate(['/app/parties', party.id]);
        this.onRoute.emit();
    }

    private newParty(party: Party): void {
        console.log(party);
    }

}

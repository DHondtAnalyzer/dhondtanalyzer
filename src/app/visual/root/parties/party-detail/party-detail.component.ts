import {Component} from '@angular/core';


/**
 * Clase PartyDetailComponent. Implementa la funcionalidad de un Componente.
 *
 * PartyDetailComponent se encarga de representar visualmente un partido político.
 */
@Component({
    selector: 'app-party-detail',
    templateUrl: './party-detail.component.html',
    styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent {


    /**
     * Atributo partyId.
     *
     * El tipo es string.
     */
    private _partyId: string;


    /**
     * Constructor de la clase.
     */
    constructor() {
    }


    /**
     * Getter del atributo partyId.
     *
     * @returns {string}
     */
    get partyId(): string {
        return this._partyId
    }


    /**
     * Setter del atributo partyId.
     *
     * @param partyId
     */
    set partyId(partyId: string) {
        this._partyId = partyId;
    }
}

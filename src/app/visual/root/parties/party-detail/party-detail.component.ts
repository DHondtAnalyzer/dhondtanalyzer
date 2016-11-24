import {Component} from '@angular/core';
import {ComponentWithParams} from "../../../shared/component-with-params";


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
export class PartyDetailComponent implements ComponentWithParams {


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
     * Getter del atributo objectId.
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @returns {string}
     */
    get objectId(): string {
        return this.partyId;
    }


    /**
     * Setter del atributo objectId
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set objectId(value: string) {
        this.partyId = value;
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

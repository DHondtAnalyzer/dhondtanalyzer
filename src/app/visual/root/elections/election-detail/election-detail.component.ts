import {Component} from '@angular/core';
import {ComponentWithParams} from "../../../shared/component-with-params";


/**
 * Clase ElectionDetailComponent. Implementa la funcionalidad de un Componente.
 *
 * ElectionDetailComponent se encarga de representar visualmente una elección.
 */
@Component({
    selector: 'app-election-detail',
    templateUrl: './election-detail.component.html',
    styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements ComponentWithParams {


    /**
     * Atributo electionId.
     *
     * El tipo es string.
     */
    private _electionId: string;


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
        return this.electionId;
    }


    /**
     * Setter del atributo objectId
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set objectId(value: string) {
        this.electionId = value;
    }

    /**
     * Getter del atributo electionId.
     *
     * @returns {string}
     */
    get electionId(): string {
        return this._electionId
    }


    /**
     * Setter del atributo electionId.
     *
     * @param electionId
     */
    set electionId(electionId: string) {
        this._electionId = electionId;
    }
}

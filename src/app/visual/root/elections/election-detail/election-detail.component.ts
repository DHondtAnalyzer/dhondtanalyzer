import {Component} from '@angular/core';


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
export class ElectionDetailComponent {


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
     * Getter del atributo electionId.
     *
     * @returns {string}
     */
    get electionId(): string {
        return this._electionId
    }


    /**
     * Getter del atributo electionId.
     *
     * @param electionId
     */
    set electionId(electionId: string) {
        this._electionId = electionId;
    }
}

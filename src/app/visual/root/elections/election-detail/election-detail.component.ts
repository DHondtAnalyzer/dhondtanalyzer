import {Component} from '@angular/core';
import {ComponentWithParams} from "../../../shared/component-with-params";
import {Election} from "../../../../dao/model/election";


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
     * Atributo model.
     *
     * El tipo es string.
     */
    private _model: Election;


    /**
     * Constructor de la clase.
     */
    constructor() {
    }


    /**
     * Getter del atributo model.
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @returns {Election}
     */
    get model(): Election {
        return this._model;
    }


    /**
     * Setter del atributo model
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set model(value: Election) {
        this._model = value;
    }
}

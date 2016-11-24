import {Component} from '@angular/core';
import {ComponentWithParams} from "../../../shared/component-with-params";
import {Model} from "../../../../dao/model/model";
import {Party} from "../../../../dao/model/party";
import {MdDialogRef} from "@angular/material";


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
     * Atributo model.
     *
     * El tipo es Party.
     */
    private _model: Party;


    /**
     * Constructor de la clase.
     */
    constructor(
        private dialogRef: MdDialogRef<PartyDetailComponent>
    ) {
    }


    /**
     * Getter del atributo model.
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @returns {string}
     */
    get model(): Party {
        return this._model;
    }


    /**
     * Setter del atributo model
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set model(value: Party) {
        this._model = value;
    }

    private closeDialog(): void{
        this.dialogRef.close();
    }
}

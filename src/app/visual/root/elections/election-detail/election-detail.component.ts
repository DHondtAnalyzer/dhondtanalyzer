import {Component} from '@angular/core';
import {ComponentWithParams} from "../../../shared/component-with-params";
import {Election} from "../../../../dao/model/election";
import {Router} from "@angular/router";
import {MdDialogRef} from "@angular/material";
import {Party} from "../../../../dao/model/party";
import {District} from "../../../../dao/model/district";


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

    private editing: boolean;


    /**
     * Atributo model.
     *
     * El tipo es string.
     */
    private _model: Election;


    /**
     * Constructor de la clase.
     */
    constructor(private dialogRef: MdDialogRef<ElectionDetailComponent>,
                private route: Router) {
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



    /**
     * Getter del atributo election.
     *
     * Se ha creado para facilitar la comprensión del código refiriendose
     * directamente como un partido y no como un modelo.
     *
     * @returns {Party}
     */
    get election(): Election {
        return this.model;
    }


    /**
     * Setter del atributo election.
     *
     * Se ha creado para facilitar la comprensión del código refiriendose
     * directamente como un partido y no como un modelo.
     *
     * @returns {Party}
     */
    set election(value: Election) {
        this.model = value;
    }


    /**
     * Función closeDialog.
     *
     * Es la encargada de cerrar el diálogo.
     */
    private closeDialog(): void {
        this.dialogRef.close();
    }


    /**
     * Función fabIcon.
     *
     * Es la encargada de manejar el control del icono que se muestra en el
     * botón de edición.
     *
     * @returns {string}
     */
    private fabIcon(): string {
        if (this.editing) {
            return 'done';
        } else {
            return 'edit';
        }
    }


    /**
     * Función editingChange.
     *
     * Es la función encargada de cambiar el estado de edición a visualización
     * y guardar los datos si fuera necesario.
     */
    private editingChange(): void {
        if (this.editing) {
            this.saveChanges();
        }
        this.editing = !this.editing;
    }


    /**
     * Función saveChanges.
     *
     * Es la encargada de guardar los datos después de una modificación o creación.
     */
    private saveChanges(): void {
        // TODO
    }


    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param district
     */
    private goToDistrict(district: District): void {
        //this.route.navigate(['/app/elections']);
        //this.closeDialog();
        console.log(district);

    }

    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param party
     */
    private goToParty(party: Party): void {
        this.route.navigate(['/app/parties', party.id]);
        this.closeDialog();
    }
}

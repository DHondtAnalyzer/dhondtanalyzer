import {Component, OnInit} from '@angular/core';
import {ComponentWithParams} from "../../../shared/component-with-params";
import {Model} from "../../../../dao/model/model";
import {Party} from "../../../../dao/model/party";
import {MdDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {Election} from "../../../../dao/model/election";


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
export class PartyDetailComponent implements ComponentWithParams, OnInit {


    private editing: boolean;

    /**
     * Atributo model.
     *
     * El tipo es Party.
     */
    private _model: Party;


    /**
     * Constructor de la clase.
     */
    constructor(private dialogRef: MdDialogRef<PartyDetailComponent>,
                private route: Router) {
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


    /**
     * Getter del atributo party.
     *
     * Se ha creado para facilitar la comprensión del código refiriendose
     * directamente como un partido y no como un modelo.
     *
     * @returns {Party}
     */
    get party(): Party {
        return this.model;
    }


    /**
     * Setter del atributo party.
     *
     * Se ha creado para facilitar la comprensión del código refiriendose
     * directamente como un partido y no como un modelo.
     *
     * @returns {Party}
     */
    set party(value: Party) {
        this.model = value;
    }


    ngOnInit(): void {
        if(!this.model.name){
            this.editing = true;
        }
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
     * @param election
     */
    private goToElection(election: Election): void {
        this.route.navigate(['/app/elections', election.id]);
        this.closeDialog();
    }
}

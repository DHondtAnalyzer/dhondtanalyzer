import {Component, OnInit} from '@angular/core';
import {Region} from "../../../../../dao/model/region";
import {ComponentWithParams} from "../../../../shared/component-with-params";
import {MdDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {Election} from "../../../../../dao/model/election";

@Component({
    selector: 'app-region-detail',
    templateUrl: './region-detail.component.html',
    styleUrls: ['./region-detail.component.css']
})
export class RegionDetailComponent implements ComponentWithParams, OnInit {


    private editing: boolean;

    /**
     * Atributo model.
     *
     * El tipo es Party.
     */
    private _model: Region;


    /**
     * Constructor de la clase.
     */
    constructor(private dialogRef: MdDialogRef<RegionDetailComponent>,
                private router: Router) {
    }


    /**
     * Getter del atributo model.
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @returns {string}
     */
    get model(): Region {
        return this._model;
    }


    /**
     * Setter del atributo model
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set model(value: Region) {
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
    get region(): Region {
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
    set region(value: Region) {
        this.model = value;
    }


    ngOnInit(): void {
        if (!this.model.name) {
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


    private navigateToElection(election: Election) {
        this.closeDialog();
        this.router.navigate(['/app/elections', election.id]);
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
}

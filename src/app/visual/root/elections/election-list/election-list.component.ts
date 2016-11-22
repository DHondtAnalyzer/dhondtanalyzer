import {Component, OnInit, Input, ViewContainerRef} from '@angular/core';
import {DaoService} from "../../../../dao/dao.service";
import {Election} from "../../../../dao/model/election";
import {ElectionDetailComponent} from "../election-detail/election-detail.component";
import {Params, ActivatedRoute} from "@angular/router";
import {MdDialog, MdDialogRef} from "@angular/material";
import {Location} from '@angular/common';


/**
 * Clase ElectionListComponent. Implementa la funcionalidad de un Componente.
 *
 * ElectionListComponent se encarga de representar visualmente el listado de
 * Elecciones así como la funcionalidad de mostrar un dialog del detalle
 * individual.
 */
@Component({
    selector: 'app-election-list',
    templateUrl: 'election-list.component.html',
    styleUrls: ['election-list.component.css']
})
export class ElectionListComponent implements OnInit {


    /**
     * Atributo dialogRef.
     *
     * El tipo es MdDialogRef<ElectionDetailComponent>.
     *
     * Representa el dialog que muestra los detalles de una Elección.
     */
    private _dialogRef: MdDialogRef<ElectionDetailComponent>;


    /**
     * Atributo electionList.
     *
     * El tipo es Array<Election>
     */
    private _electionList: Array<Election>;


    /**
     * Constructor de la clase.
     *
     * @param daoService
     * @param dialog
     * @param viewContainerRef
     * @param route
     * @param location
     */
    constructor(private daoService: DaoService,
                private dialog: MdDialog,
                private viewContainerRef: ViewContainerRef,
                private route: ActivatedRoute,
                private location: Location) {
    }


    /**
     * Getter del atributo dialogRef.
     *
     * @returns {MdDialogRef<ElectionDetailComponent>}
     */
    get dialogRef(): MdDialogRef<ElectionDetailComponent> {
        return this._dialogRef;
    }


    /**
     * Setter del atributo dialogRef.
     *
     * @param value
     */
    set dialogRef(value: MdDialogRef<ElectionDetailComponent>) {
        this._dialogRef = value;
    }


    /**
     * Getter del atributo electionList.
     *
     * @returns {Array<Election>}
     */
    get electionList(): Array<Election> {
        return this._electionList;
    }


    /**
     * Setter del atributo electionList.
     *
     * @param value
     */
    set electionList(value: Array<Election>) {
        this._electionList = value;
    }


    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ngOnInit() {
        this.electionList = this.daoService.electionList;
        this.readRoute();
    }


    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    readRoute(): void {
        this.route.params
            .forEach((params: Params) => {
                if (params['id'] !== undefined) {
                    this.openDialog(params['id'], true);
                }
            });
    }


    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de una
     * elección a partir de un diálogo que contiene el contenido del
     * component ElectionDetailComponent.
     *
     * @param electionId string que representa el id de la elección a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     */
    openDialog(electionId: string, navigated = false) {

        let basePath = this.location.path();

        this.dialogRef = this.dialog.open(ElectionDetailComponent, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });

        this.dialogRef.componentInstance.electionId = electionId;
        if (!navigated) {
            this.location.go(basePath + "/" + electionId);
        }

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;

            if (navigated) {
                navigated = false;
                basePath = basePath.split('/' + electionId)[0];
                this.location.go(basePath);
            }
        });

    }
}

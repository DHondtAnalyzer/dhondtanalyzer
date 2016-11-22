import {Location} from '@angular/common';
import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {MdDialog, MdDialogRef} from "@angular/material";

import {PartyDetailComponent} from "../party-detail/party-detail.component";

import {Party} from "../../../../dao/model/party";
import {DaoService} from "../../../../dao/dao.service";
import {Params, ActivatedRoute} from "@angular/router";


/**
 * Clase PartyListComponent. Implementa la funcionalidad de un Componente.
 *
 * PartyListComponent se encarga de representar visualmente el listado de
 * Partidos Políticos así como la funcionalidad de mostrar un dialog del
 * detalle individual.
 */
@Component({
    selector: 'app-party-list',
    templateUrl: './party-list.component.html',
    styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {


    /**
     * Atributo dialogRef.
     *
     * El tipo es MdDialogRef<PartyDetailComponent>.
     *
     * Representa el dialog que muestra los detalles de un Partido Político.
     */
    private _dialogRef: MdDialogRef<PartyDetailComponent>;


    /**
     * Atributo partyList.
     *
     * El tipo es Array<Party>
     */
    private _partyList: Array<Party>;


    /**
     * Constructor de la clase.
     *
     * @param dialog
     * @param viewContainerRef
     * @param daoService
     * @param location
     * @param route
     */
    constructor(private dialog: MdDialog,
                private viewContainerRef: ViewContainerRef,
                private daoService: DaoService,
                private location: Location,
                private route: ActivatedRoute) {
    }


    /**
     * Getter del atributo dialogRef.
     *
     * @returns {MdDialogRef<PartyDetailComponent>}
     */
    get dialogRef(): MdDialogRef<PartyDetailComponent> {
        return this._dialogRef;
    }


    /**
     * Setter del atributo dialogRef.
     *
     * @param value
     */
    set dialogRef(value: MdDialogRef<PartyDetailComponent>) {
        this._dialogRef = value;
    }


    /**
     * Getter del atributo partyList.
     *
     * @returns {Array<Party>}
     */
    get partyList(): Array<Party> {
        return this._partyList;
    }


    /**
     * Setter del atributo partyList.
     *
     * @param value
     */
    set partyList(value: Array<Party>) {
        this._partyList = value;
    }


    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ngOnInit() {
        this.partyList = this.daoService.partyList;
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
     * Es la función encargada de mostrar en pantalla el detalle de un
     * partido político a partir de un diálogo que contiene el contenido del
     * component PartyDetailComponent.
     *
     * @param partyId string que representa el id del partido a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     */
    openDialog(partyId: string, navigated = false) {

        let basePath = this.location.path();

        this.dialogRef = this.dialog.open(PartyDetailComponent, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });

        this.dialogRef.componentInstance.partyId = partyId;
        if (!navigated) {
            this.location.go(basePath + "/" + partyId);
        }

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;

            if (navigated) {
                navigated = false;
                basePath = basePath.split('/' + partyId)[0];
                this.location.go(basePath);
            }
        });

    }

}

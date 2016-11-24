import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {DialogService} from "../../../shared/dialog/dialog.service";
import {DaoService} from "../../../../dao/dao.service";

import {Party} from "../../../../dao/model/party";
import {PartyDetailComponent} from "../party-detail/party-detail.component";


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
     * Atributo partyList.
     *
     * El tipo es Array<Party>
     */
    private _partyList: Array<Party>;


    /**
     * Constructor de la clase.
     *
     * @param viewContainerRef
     * @param route
     * @param daoService
     * @param dialogHelper
     */
    constructor(private viewContainerRef: ViewContainerRef,
                private route: ActivatedRoute,
                private daoService: DaoService,
                private dialogHelper: DialogService) {
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
        this.initDialogHelper();
        this.readRoute();
    }


    /**
     * Función initDialogService.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que muestra dialogs.
     */
    initDialogHelper(): void {
        this.dialogHelper.init(this.viewContainerRef,
            PartyDetailComponent, this.route);
    }


    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    readRoute(): void {
        this.dialogHelper.readRoute();
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
    openDialog(partyId: string, navigated = false): void {
        this.dialogHelper.openDialog(partyId, navigated);
    }

}

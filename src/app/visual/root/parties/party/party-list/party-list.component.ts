import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {DialogService} from "../../../../shared/dialog/dialog.service";
import {DaoService} from "../../../../../dao/dao.service";

import {Party} from "../../../../../dao/model/party";
import {PartyDetailComponent} from "../party-detail/party-detail.component";
import {RouterService} from "../../../../shared/router/router.service";
import {ObjectFromRoute} from "../../../../shared/router/object-from-route";


/**
 * Clase PartyListComponent. Implementa la funcionalidad de un Componente.
 *
 * PartyListComponent se encarga de representar visualmente el listado de
 * Partidos Políticos así como la funcionalidad de mostrar un dialog del
 * detalle individual.
 */
@Component({
    selector: 'app-party-list',
    templateUrl: 'party-list.component.html',
    styleUrls: ['party-list.component.css']
})
export class PartyListComponent implements OnInit, ObjectFromRoute {


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
     * @param routerService
     * @param dialogService
     */
    constructor(private viewContainerRef: ViewContainerRef,
                private route: ActivatedRoute,
                private daoService: DaoService,
                private routerService: RouterService<Party>,
                private dialogService: DialogService,) {
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
        this.partyList = this.daoService.getParties();
        this.initRouterHelper();
        this.initDialogHelper();
        this.readRoute();
    }


    /**
     * Función initRouterHelper.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que asigna el modelo a partir de la ruta en el dialog.
     */
    private initRouterHelper(): void {
        this.routerService.init(this.route);
    }


    /**
     * Función initDialogService.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que muestra dialogs.
     */
    private initDialogHelper(): void {
        this.dialogService.init(this.viewContainerRef,
            PartyDetailComponent);
    }


    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    private readRoute(): void {
        this.routerService.readRoute(this);
    }


    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de un
     * partido político a partir de un diálogo que contiene el contenido del
     * component PartyDetailComponent.
     *
     * @param party string que representa el id del partido a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     * @param newParty
     */
    private openDialog(party: Party, navigated = false,
                       newParty = false): void {
        this.dialogService.openDialog(party, navigated, newParty);
    }


    private create(navigated = false) {
        let party = Party.newInstance();
        this.openDialog(party, navigated, true);
    }

    objectIdCallback(id: string): void {
        this.openDialog(this.daoService.getPartyById(id), true);
    }

    createCallback(): void {
        this.create(true);
    }
}

import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {DialogService} from "../../../../shared/dialog/dialog.service";
import {DaoService} from "../../../../../dao/dao.service";

import {Party} from "../../../../../dao/model/party";
import {PartyDetailComponent} from "../party-detail/party-detail.component";
import {RouterService} from "../../../../shared/router/router.service";
import {ObjectFromRoute} from "../../../../shared/router/object-from-route";
import {AppListObservable} from "../../../../../dao/app-list-observable";


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
export class PartyListComponent implements OnInit, ObjectFromRoute {


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
                private routerService: RouterService,
                private dialogService: DialogService,) {
    }


  /**
   * Getter del atributo partyList.
   *
   * @returns {Array<Party>}
   */
  get partyList(): AppListObservable<Array<Party>> {
    return this.daoService.getPartyListObservable();
  }


    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ngOnInit() {
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
     * @param id string que representa el id del partido a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     * @param newParty
     */
    private openDialog(id: string, navigated = false,
                       newParty = false): void {
        this.dialogService.openDialog(id, navigated, newParty);
    }


    private create(navigated = false) {
        //let party = Party.newInstance();
        this.openDialog('', navigated, true);
    }

    objectIdCallback(id: string): void {
        this.openDialog(id, true);
    }

    createCallback(): void {
        this.create(true);
    }
}

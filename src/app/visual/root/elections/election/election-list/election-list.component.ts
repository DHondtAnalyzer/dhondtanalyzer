import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {DialogService} from "../../../../shared/dialog/dialog.service";
import {DaoService} from "../../../../../dao/dao.service";

import {Election} from "../../../../../dao/model/election";
import {ElectionDetailComponent} from "../election-detail/election-detail.component";
import {Model} from "../../../../../dao/model/model";
import {RouterService} from "../../../../shared/router/router.service";
import {ObjectFromRoute} from "../../../../shared/router/object-from-route";


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
export class ElectionListComponent implements OnInit, ObjectFromRoute {


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
     * @param viewContainerRef
     * @param route
     * @param routerHelper
     * @param dialogService
     */
    constructor(private viewContainerRef: ViewContainerRef,
                private route: ActivatedRoute,
                private daoService: DaoService,
                private routerHelper: RouterService<Election>,
                private dialogService: DialogService) {
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
        this.electionList = this.daoService.getElections();
        this.initRouterHelper();
        this.initDialogService();
        this.readRoute();
    }


    /**
     * Función initRouterHelper.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que asigna el modelo a partir de la ruta en el dialog.
     */
    private initRouterHelper(): void {
        this.routerHelper.init(this.route);
    }


    /**
     * Función initDialogService.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que muestra dialogs.
     */
    private initDialogService(): void {
        this.dialogService.init(this.viewContainerRef,
            ElectionDetailComponent);
    }


    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    private readRoute(): void {
        this.routerHelper.readRoute(this);
    }


    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de una
     * elección a partir de un diálogo que contiene el contenido del
     * component ElectionDetailComponent.
     *
     * @param election
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     * @param newElection
     */
    private openDialog(election: Election, navigated = false,
                       newElection = false): void {
        this.dialogService.openDialog(election, navigated, newElection);
    }


    objectIdCallback(id: string): void {
        this.openDialog(this.daoService.getElectionById(id), true);
    }


    createCallback(): void {
        this.create(true);
    }


    private create(navigated = false) {
        let election = Election.newInstance();
        this.openDialog(election, navigated, true);
    }
}

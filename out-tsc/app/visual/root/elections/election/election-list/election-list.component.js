var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DialogService } from "../../../../shared/dialog/dialog.service";
import { DaoService } from "../../../../../dao/dao.service";
import { ElectionDetailComponent } from "../election-detail/election-detail.component";
import { RouterService } from "../../../../shared/router/router.service";
/**
 * Clase ElectionListComponent. Implementa la funcionalidad de un Componente.
 *
 * ElectionListComponent se encarga de representar visualmente el listado de
 * Elecciones así como la funcionalidad de mostrar un dialog del detalle
 * individual.
 */
export var ElectionListComponent = (function () {
    /**
     * Constructor de la clase.
     *
     * @param daoService
     * @param viewContainerRef
     * @param route
     * @param cd
     * @param routerHelper
     * @param dialogService
     */
    function ElectionListComponent(viewContainerRef, route, daoService, cd, routerHelper, dialogService) {
        this.viewContainerRef = viewContainerRef;
        this.route = route;
        this.daoService = daoService;
        this.cd = cd;
        this.routerHelper = routerHelper;
        this.dialogService = dialogService;
    }
    Object.defineProperty(ElectionListComponent.prototype, "electionList", {
        /**
         * Getter del atributo electionList.
         *
         * @returns {Array<Election>}
         */
        get: function () {
            return this.daoService.getElectionListObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ElectionListComponent.prototype.ngOnInit = function () {
        this.initRouterHelper();
        this.initDialogService();
        this.readRoute();
    };
    /**
     * Función initRouterHelper.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que asigna el modelo a partir de la ruta en el dialog.
     */
    ElectionListComponent.prototype.initRouterHelper = function () {
        this.routerHelper.init(this.route);
    };
    /**
     * Función initDialogService.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que muestra dialogs.
     */
    ElectionListComponent.prototype.initDialogService = function () {
        this.dialogService.init(this.viewContainerRef, ElectionDetailComponent);
    };
    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    ElectionListComponent.prototype.readRoute = function () {
        this.routerHelper.readRoute(this);
    };
    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de una
     * elección a partir de un diálogo que contiene el contenido del
     * component ElectionDetailComponent.
     *
     * @param id
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     * @param newElection
     */
    ElectionListComponent.prototype.openDialog = function (id, navigated, newElection) {
        if (navigated === void 0) { navigated = false; }
        if (newElection === void 0) { newElection = false; }
        this.dialogService.openDialog(id, navigated, newElection);
    };
    ElectionListComponent.prototype.objectIdCallback = function (id) {
        this.openDialog(id, true);
    };
    ElectionListComponent.prototype.createCallback = function () {
        this.create(true);
    };
    ElectionListComponent.prototype.create = function (navigated) {
        if (navigated === void 0) { navigated = false; }
        // TODO
        //let election = Election.newInstance();
        this.openDialog('', navigated, true);
    };
    ElectionListComponent = __decorate([
        Component({
            selector: 'app-election-list',
            templateUrl: './election-list.component.html',
            styleUrls: ['./election-list.component.css']
        }), 
        __metadata('design:paramtypes', [ViewContainerRef, ActivatedRoute, DaoService, ChangeDetectorRef, RouterService, DialogService])
    ], ElectionListComponent);
    return ElectionListComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election/election-list/election-list.component.js.map
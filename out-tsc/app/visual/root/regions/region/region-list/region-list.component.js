var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DaoService } from "../../../../../dao/dao.service";
import { RouterService } from "../../../../shared/router/router.service";
import { DialogService } from "../../../../shared/dialog/dialog.service";
import { RegionDetailComponent } from "../region-detail/region-detail.component";
export var RegionListComponent = (function () {
    /**
     * Constructor de la clase.
     *
     * @param viewContainerRef
     * @param route
     * @param daoService
     * @param routerService
     * @param dialogService
     */
    function RegionListComponent(viewContainerRef, route, daoService, routerService, dialogService) {
        this.viewContainerRef = viewContainerRef;
        this.route = route;
        this.daoService = daoService;
        this.routerService = routerService;
        this.dialogService = dialogService;
    }
    Object.defineProperty(RegionListComponent.prototype, "regionList", {
        /**
         * Getter del atributo regionList.
         *
         * @returns {Array<Party>}
         */
        get: function () {
            return this.daoService.getRegionListObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    RegionListComponent.prototype.ngOnInit = function () {
        this.initRouterHelper();
        this.initDialogHelper();
        this.readRoute();
    };
    /**
     * Función initRouterHelper.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que asigna el modelo a partir de la ruta en el dialog.
     */
    RegionListComponent.prototype.initRouterHelper = function () {
        this.routerService.init(this.route);
    };
    /**
     * Función initDialogService.
     *
     * Se encarga de asignar los parámetros necesarios para poder utilizar
     * el servicio que muestra dialogs.
     */
    RegionListComponent.prototype.initDialogHelper = function () {
        this.dialogService.init(this.viewContainerRef, RegionDetailComponent);
    };
    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    RegionListComponent.prototype.readRoute = function () {
        this.routerService.readRoute(this);
    };
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
     * @param newModel
     */
    RegionListComponent.prototype.openDialog = function (id, navigated, newModel) {
        if (navigated === void 0) { navigated = false; }
        if (newModel === void 0) { newModel = false; }
        this.dialogService.openDialog(id, navigated, newModel);
    };
    RegionListComponent.prototype.create = function (navigated) {
        if (navigated === void 0) { navigated = false; }
        //let region = Region.newInstance();
        this.openDialog('', navigated, true);
    };
    RegionListComponent.prototype.objectIdCallback = function (id) {
        this.openDialog(id, true);
    };
    RegionListComponent.prototype.createCallback = function () {
        this.create(true);
    };
    RegionListComponent = __decorate([
        Component({
            selector: 'app-region-list',
            templateUrl: './region-list.component.html',
            styleUrls: ['./region-list.component.css']
        }), 
        __metadata('design:paramtypes', [ViewContainerRef, ActivatedRoute, DaoService, RouterService, DialogService])
    ], RegionListComponent);
    return RegionListComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region/region-list/region-list.component.js.map
import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ObjectFromRoute} from "../../../../shared/router/object-from-route";
import {Region} from "../../../../../dao/model/region";
import {ActivatedRoute} from "@angular/router";
import {DaoService} from "../../../../../dao/dao.service";
import {RouterService} from "../../../../shared/router/router.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";
import {RegionDetailComponent} from "../region-detail/region-detail.component";

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit, ObjectFromRoute {


    /**
     * Atributo regionList.
     *
     * El tipo es Array<Region>
     */
    private _regionList: Array<Region>;


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
     * Getter del atributo regionList.
     *
     * @returns {Array<Party>}
     */
    get regionList(): Array<Region> {
        return this._regionList;
    }


    /**
     * Setter del atributo regionList.
     *
     * @param value
     */
    set regionList(value: Array<Region>) {
        this._regionList = value;
    }


    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ngOnInit() {
        this.regionList = this.daoService.getRegions();
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
            RegionDetailComponent);
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
        //let region = Region.newInstance();
        this.openDialog('', navigated, true);
    }

    objectIdCallback(id: string): void {
        this.openDialog(id, true);
    }

    createCallback(): void {
        this.create(true);
    }
}

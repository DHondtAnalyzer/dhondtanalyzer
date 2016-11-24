import {Injectable} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Model} from "../../../dao/model/model";
import {DaoService} from "../../../dao/dao.service";

import 'rxjs/add/operator/toPromise';
import {ObjectFromRoute} from "./object-from-route";

/**
 * Clase RouteService. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de comprobar si se está hacediendo a la ruta
 * de un modelo concreto. En el caso de ser así, envía una llamada mediante la
 * interfaz ObjectFromRoute con objeto de dicho modelo.
 */
@Injectable()
export class RouterService<T extends Model> {


    /**
     * Atributo route.
     *
     * El tipo es ActivatedRoute.
     *
     */
    private route: ActivatedRoute;


    /**
     * Constructor de la clase.
     *
     */
    constructor(private daoService: DaoService) {
    }


    /**
     * Función init.
     *
     * Inicializa los atributos de la clase. Puesto que es un servicio (no se
     * puede asignar atributos desde el constructor que no sean otros servicios
     * genéricos) hay que hacerlo desde una función externa.
     *
     * @param route ruta desde la que se extrae el id del objeto a mostrar en
     * el dialog.
     */
    public init(route: ActivatedRoute) {
        this.route = route;
    }


    /**
     * Función getModelFromRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    public readRoute(repsonse: ObjectFromRoute<Model>) {

        this.route.params
            .forEach((params: Params) => {
                if (params['id'] !== undefined) {
                    repsonse.objectCallback(this.daoService.partyList[0]);
                }
            });
    }
}

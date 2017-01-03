var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
/**
 * Clase RouteService. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de comprobar si se está hacediendo a la ruta
 * de un modelo concreto. En el caso de ser así, envía una llamada mediante la
 * interfaz ObjectFromRoute con objeto de dicho modelo.
 */
export var RouterService = (function () {
    /**
     * Constructor de la clase.
     *
     */
    function RouterService() {
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
    RouterService.prototype.init = function (route) {
        this.route = route;
    };
    /**
     * Función getModelFromRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    RouterService.prototype.readRoute = function (response) {
        this.route.params
            .forEach(function (params) {
            var id = params['id'];
            if (id !== undefined) {
                if (id === 'new') {
                    response.createCallback();
                }
                else {
                    response.objectIdCallback(id);
                }
            }
        });
    };
    RouterService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], RouterService);
    return RouterService;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/router/router.service.js.map
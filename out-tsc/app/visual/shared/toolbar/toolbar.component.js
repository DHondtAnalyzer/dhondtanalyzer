var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Link } from "../link";
/**
 * Clase ToolbarComponent. Implementa la funcionalidad de un Componente.
 *
 * ToolbarComponent es un componente que muestra la barra superior de la
 * aplicación y se encarga de ofrecer los links que permiten la navegación
 * por el sitio web.
 */
export var ToolbarComponent = (function () {
    /**
     * Constructor de la clase ToolbarComponent.
     *
     * @param router Servicio Router que permite la redirección hacia otras
     * rutas dentro de la aplicación.
     */
    function ToolbarComponent(router) {
        this.router = router;
    }
    Object.defineProperty(ToolbarComponent.prototype, "links", {
        /**
         * Getter del atributo links.
         *
         * @returns {Array<Link>}
         */
        get: function () {
            return this._links;
        },
        /**
         * Setter del atributo links.
         *
         * @param value
         */
        set: function (value) {
            this._links = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Funcion ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        this.links = [
            new Link('Home', '/app/home'),
            new Link('Elections', '/app/elections'),
            new Link('Parties', '/app/parties'),
            new Link('Regions', '/app/regions'),
            new Link('Exit', '/')
        ];
    };
    /**
     * Función goTo.
     *
     * Redirige al usuario hacia la ruta indicada como parámetro.
     *
     * @param link Link que representa la ruta relativa hacia la cuál se
     * pretende navegar.
     */
    ToolbarComponent.prototype.goTo = function (link) {
        this.router.navigate([link.url]);
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], ToolbarComponent.prototype, "title", void 0);
    ToolbarComponent = __decorate([
        Component({
            selector: 'app-toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.css']
        }), 
        __metadata('design:paramtypes', [Router])
    ], ToolbarComponent);
    return ToolbarComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/toolbar/toolbar.component.js.map
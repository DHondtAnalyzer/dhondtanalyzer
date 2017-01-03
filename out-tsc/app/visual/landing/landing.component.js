var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from "@angular/router";
/**
 * Clase LandingComponent. Implementa la funcionalidad de un Componente.
 *
 * LandingComponent es el el componente que se muestra al acceder a la
 * aplicación. Aquí es dónde se puede obtener información acerca de lo
 * que se puede hacer con la misma.
 *
 * En sus componentes hijos  es donde se implementa la funcionalidad de
 * registro y de inicio de sesión.
 */
export var LandingComponent = (function () {
    /**
     * Constructor de la clase.
     *
     * @param router Servicio Router que permite la redirección hacia otras
     * rutas dentro de la aplicación.
     */
    function LandingComponent(router) {
        this.router = router;
    }
    Object.defineProperty(LandingComponent.prototype, "title", {
        /**
         * Getter del atributo title.
         *
         * @returns {string}
         */
        get: function () {
            return this._title;
        },
        /**
         * Setter del atributo title.
         *
         * @param value
         */
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit.
     */
    LandingComponent.prototype.ngOnInit = function () {
        this.title = 'DHondtAnalyzer';
    };
    /**
     * Función goTo.
     *
     * Redirige al usuario hacia la ruta indicada como parámetro.
     *
     * @param url string que representa la ruta relativa hacia la cuál se
     * pretende navegar.
     */
    LandingComponent.prototype.goTo = function (url) {
        this.router.navigate([url]);
    };
    LandingComponent = __decorate([
        Component({
            selector: 'app-landing',
            templateUrl: './landing.component.html',
            styleUrls: ['./landing.component.css']
        }), 
        __metadata('design:paramtypes', [Router])
    ], LandingComponent);
    return LandingComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/landing/landing.component.js.map
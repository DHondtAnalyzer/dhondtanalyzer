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
/**
 * Clase RootComponent. Implementa la funcionalidad de un Componente.
 *
 * RootComponent
 */
export var RootComponent = (function () {
    /**
     * Constructor de la clase.
     */
    function RootComponent() {
    }
    Object.defineProperty(RootComponent.prototype, "title", {
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
     * Implementa la función de la interfaz OnInit
     */
    RootComponent.prototype.ngOnInit = function () {
        this.title = 'DHondtAnalyzer';
    };
    RootComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './root.component.html',
            styleUrls: ['./root.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], RootComponent);
    return RootComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/root.component.js.map
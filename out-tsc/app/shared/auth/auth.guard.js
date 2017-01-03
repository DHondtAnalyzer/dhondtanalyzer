var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
/**
 * Clase AuthGuard. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de permitir o denegar el acceso a la
 * aplicación dependiendo de si el usuario está identificado o no.
 */
export var AuthGuard = (function () {
    /**
     * Constructor de la clase.
     */
    function AuthGuard() {
    }
    /**
     * Función canActivate.
     *
     * Es la implementación de la interfaz CanActivate, que se utiliza
     * para realizar comprobaciones de acceso a una ruta especifica.
     *
     * @returns {boolean} Representa si el usuario puede acceder a la ruta
     * en la cual se inyecta el servicio AuthGuard.
     */
    AuthGuard.prototype.canActivate = function () {
        //TODO
        return true;
    };
    AuthGuard = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], AuthGuard);
    return AuthGuard;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/shared/auth/auth.guard.js.map
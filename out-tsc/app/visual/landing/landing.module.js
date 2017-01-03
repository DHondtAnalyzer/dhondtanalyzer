var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@angular/material";
import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
/**
 * Clase LandingModule. Implementa la funcionalidad de un Modulo.
 *
 * LandingModule es el módulo que representa la parte externa de la aplicación.
 */
export var LandingModule = (function () {
    /**
     * Constructor de la clase.
     */
    function LandingModule() {
    }
    LandingModule = __decorate([
        NgModule({
            declarations: [
                LandingComponent
            ],
            imports: [
                CommonModule,
                MaterialModule,
                LandingRoutingModule,
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], LandingModule);
    return LandingModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/landing/landing.module.js.map
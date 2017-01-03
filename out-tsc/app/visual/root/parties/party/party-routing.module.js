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
import { RouterModule } from '@angular/router';
import { PartyListComponent } from "./party-list/party-list.component";
/**
 * Clase PartyRoutingModule. Implementa la funcionalidad de un Módulo.
 *
 * PartyRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación dentro del módulo Party.
 */
export var PartyRoutingModule = (function () {
    /**
     * Constructor de la clase.
     */
    function PartyRoutingModule() {
    }
    PartyRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild([
                    {
                        path: '', component: PartyListComponent
                    },
                    {
                        path: ':id', component: PartyListComponent
                    },
                ])
            ],
            exports: [
                RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PartyRoutingModule);
    return PartyRoutingModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/parties/party/party-routing.module.js.map
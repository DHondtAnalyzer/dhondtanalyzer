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
import { ElectionListComponent } from "./election-list/election-list.component";
/**
 * Clase ElectionRoutingModule. Implementa la funcionalidad de un Módulo.
 *
 * ElectionRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación dentro del módulo Election.
 */
export var ElectionRoutingModule = (function () {
    /**
     * Constructor de la clase.
     */
    function ElectionRoutingModule() {
    }
    ElectionRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild([
                    {
                        path: '',
                        component: ElectionListComponent
                    },
                    {
                        path: ':id',
                        component: ElectionListComponent
                    },
                ])
            ],
            exports: [
                RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ElectionRoutingModule);
    return ElectionRoutingModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election/election-routing.module.js.map
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
import { AuthGuard } from "./shared/auth/auth.guard";
/**
 * Clase AppRoutingModule.Implementa la funcionalidad de un Módulo.
 *
 * AppRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación hacia los módulos Landing y Root, que se corresponden con
 * la parte externa de la aplicación y la interna.
 *
 * Para poder acceder al contenido de RootModule es necesario haberse
 * identificado previamente en el sistema. Esta comprobación se realiza en la
 * clase AuthGuard.
 */
export var AppRoutingModule = (function () {
    /**
     * Constructor de la clase.
     */
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot([
                    {
                        path: '',
                        loadChildren: 'app/visual/landing/landing.module#LandingModule'
                    },
                    {
                        path: 'app',
                        loadChildren: 'app/visual/root/root.module#RootModule',
                        canActivate: [AuthGuard]
                    },
                ])
            ],
            exports: [
                RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/app-routing.module.js.map
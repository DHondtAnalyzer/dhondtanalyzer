/**
 * Created by garciparedes on 10/11/2016.
 */
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
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root.component";
/**
 * Clase RootRoutingModule. Implementa la funcionalidad de un Módulo.
 *
 * RootRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación dentro del módulo Root.
 */
export var RootRoutingModule = (function () {
    /**
     * Constructor de la clase.
     */
    function RootRoutingModule() {
    }
    RootRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild([
                    {
                        path: '',
                        component: RootComponent,
                        children: [
                            {
                                path: '',
                                redirectTo: 'home',
                                pathMatch: 'full'
                            },
                            {
                                path: 'home',
                                component: HomeComponent
                            },
                            {
                                path: 'elections',
                                loadChildren: 'app/visual/root/elections/election/election.module#ElectionModule'
                            },
                            {
                                path: 'parties',
                                loadChildren: 'app/visual/root/parties/party/party.module#PartyModule'
                            },
                            {
                                path: 'regions',
                                loadChildren: 'app/visual/root/regions/region/region.module#RegionModule'
                            },
                        ]
                    }
                ])
            ],
            exports: [
                RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RootRoutingModule);
    return RootRoutingModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/root-routing.module.js.map
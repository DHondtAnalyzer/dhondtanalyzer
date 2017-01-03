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
import { HomeComponent } from "./home/home.component";
import { RootComponent } from "./root.component";
import { RootRoutingModule } from "./root-routing.module";
import { DialogService } from "../shared/dialog/dialog.service";
import { RouterService } from "../shared/router/router.service";
import { SharedModule } from "../shared/shared.module";
/**
 * Clase RootModule. Implementa la funcionalidad de un Modulo.
 *
 * RootModule es el módulo raíz de la aplicación una vez el usuario se ha
 * identificado en el sistema.
 */
export var RootModule = (function () {
    /**
     * Constructor de la clase.
     */
    function RootModule() {
    }
    RootModule = __decorate([
        NgModule({
            declarations: [
                HomeComponent,
                RootComponent,
            ],
            imports: [
                CommonModule,
                MaterialModule,
                RootRoutingModule,
                SharedModule,
            ],
            providers: [
                DialogService,
                RouterService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RootModule);
    return RootModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/root.module.js.map
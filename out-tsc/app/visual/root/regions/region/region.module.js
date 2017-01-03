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
import { FormsModule } from "@angular/forms";
import { RegionRoutingModule } from "./region-routing.module";
import { RegionListComponent } from './region-list/region-list.component';
import { RegionDetailComponent } from './region-detail/region-detail.component';
import { ElectionCommonModule } from "../../elections/election-common/election-common.module";
import { RegionCommonModule } from "../region-common/region-common.module";
/**
 * Clase RegionModule. Implementa la funcionalidad de un Modulo.
 *
 * RootModule es el módulo raíz de la aplicación una vez el usuario se ha
 * identificado en el sistema.
 */
export var RegionModule = (function () {
    /**
     * Constructor de la clase.
     */
    function RegionModule() {
    }
    RegionModule = __decorate([
        NgModule({
            declarations: [
                RegionListComponent,
                RegionDetailComponent
            ],
            entryComponents: [
                RegionDetailComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule,
                RegionRoutingModule,
                RegionCommonModule,
                ElectionCommonModule,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], RegionModule);
    return RegionModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region/region.module.js.map
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
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { SharedModule } from "../../../shared/shared.module";
import { DaoModule } from "../../../../dao/dao.module";
import { RegionGridComponent } from "./region-grid/region-grid.component";
import { RegionResumeComponent } from "./region-resume/region-resume.component";
/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
export var RegionCommonModule = (function () {
    /**
     * Constructor de la clase.
     */
    function RegionCommonModule() {
    }
    RegionCommonModule = __decorate([
        NgModule({
            declarations: [
                RegionGridComponent,
                RegionResumeComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule,
                SharedModule,
                DaoModule
            ],
            exports: [
                RegionGridComponent,
            ],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], RegionCommonModule);
    return RegionCommonModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region-common/region-common.module.js.map
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
import { ElectionGridComponent } from './election-grid/election-grid.component';
import { SharedModule } from "../../../shared/shared.module";
import { ElectionResumeComponent } from "./election-resume/election-resume.component";
/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
export var ElectionCommonModule = (function () {
    /**
     * Constructor de la clase.
     */
    function ElectionCommonModule() {
    }
    ElectionCommonModule = __decorate([
        NgModule({
            declarations: [
                ElectionGridComponent,
                ElectionResumeComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule,
                SharedModule,
            ],
            exports: [
                ElectionGridComponent,
            ],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], ElectionCommonModule);
    return ElectionCommonModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election-common/election-common.module.js.map
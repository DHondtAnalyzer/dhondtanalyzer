"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var election_grid_component_1 = require('./election-grid/election-grid.component');
var shared_module_1 = require("../../../shared/shared.module");
var election_resume_component_1 = require("./election-resume/election-resume.component");
/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
var ElectionCommonModule = (function () {
    /**
     * Constructor de la clase.
     */
    function ElectionCommonModule() {
    }
    ElectionCommonModule = __decorate([
        core_1.NgModule({
            declarations: [
                election_grid_component_1.ElectionGridComponent,
                election_resume_component_1.ElectionResumeComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MaterialModule,
                shared_module_1.SharedModule,
            ],
            exports: [
                election_grid_component_1.ElectionGridComponent,
            ],
            providers: [],
        })
    ], ElectionCommonModule);
    return ElectionCommonModule;
}());
exports.ElectionCommonModule = ElectionCommonModule;

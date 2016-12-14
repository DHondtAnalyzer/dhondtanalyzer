"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var material_1 = require("@angular/material");
var district_grid_component_1 = require("./district-grid/district-grid.component");
var forms_1 = require("@angular/forms");
var district_resume_component_1 = require('./district-resume/district-resume.component');
var shared_module_1 = require("../../shared/shared.module");
var dao_module_1 = require("../../../dao/dao.module");
var DistrictCommonModule = (function () {
    function DistrictCommonModule() {
    }
    DistrictCommonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MaterialModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                dao_module_1.DaoModule,
            ],
            declarations: [
                district_grid_component_1.DistrictGridComponent,
                district_resume_component_1.DistrictResumeComponent
            ],
            exports: [
                district_grid_component_1.DistrictGridComponent
            ]
        })
    ], DistrictCommonModule);
    return DistrictCommonModule;
}());
exports.DistrictCommonModule = DistrictCommonModule;

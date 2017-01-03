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
import { CommonModule } from '@angular/common';
import { MaterialModule } from "@angular/material";
import { DistrictGridComponent } from "./district-grid/district-grid.component";
import { FormsModule } from "@angular/forms";
import { DistrictResumeComponent } from './district-resume/district-resume.component';
import { SharedModule } from "../../shared/shared.module";
import { DaoModule } from "../../../dao/dao.module";
export var DistrictCommonModule = (function () {
    function DistrictCommonModule() {
    }
    DistrictCommonModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MaterialModule,
                FormsModule,
                SharedModule,
                DaoModule,
            ],
            declarations: [
                DistrictGridComponent,
                DistrictResumeComponent
            ],
            exports: [
                DistrictGridComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DistrictCommonModule);
    return DistrictCommonModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/districts/district-common.module.js.map
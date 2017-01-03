var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { District } from "../../../../dao/model/district";
import { Router } from "@angular/router";
import { DaoService } from "../../../../dao/dao.service";
export var DistrictResumeComponent = (function () {
    function DistrictResumeComponent(route, daoService) {
        this.route = route;
        this.daoService = daoService;
        this.onRemove = new EventEmitter();
        this.onRoute = new EventEmitter();
    }
    DistrictResumeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.district.region || !this.district.census || !this.district.seats) {
            this.editing = true;
        }
        this.district.region.subscribe(function (r) {
            _this.name = r.name;
            _this.id = r.id;
        });
    };
    DistrictResumeComponent.prototype.save = function () {
        var _this = this;
        this.daoService.saveDistrict(this.district).then(function () {
            _this.editing = false;
        });
    };
    DistrictResumeComponent.prototype.edit = function () {
        this.editing = true;
    };
    DistrictResumeComponent.prototype.view = function () {
        this.onRoute.emit();
        this.route.navigate(['/app/regions', this.id]);
    };
    DistrictResumeComponent.prototype.remove = function () {
        this.onRemove.emit(this.district.id);
    };
    __decorate([
        Input(), 
        __metadata('design:type', District)
    ], DistrictResumeComponent.prototype, "district", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], DistrictResumeComponent.prototype, "onRemove", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], DistrictResumeComponent.prototype, "onRoute", void 0);
    DistrictResumeComponent = __decorate([
        Component({
            selector: 'app-district-resume',
            templateUrl: './district-resume.component.html',
            styleUrls: ['./district-resume.component.css']
        }), 
        __metadata('design:paramtypes', [Router, DaoService])
    ], DistrictResumeComponent);
    return DistrictResumeComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/districts/district-resume/district-resume.component.js.map
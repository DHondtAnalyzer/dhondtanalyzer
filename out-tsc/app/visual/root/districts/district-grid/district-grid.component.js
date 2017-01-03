var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DaoService } from "../../../../dao/dao.service";
export var DistrictGridComponent = (function () {
    function DistrictGridComponent(daoService) {
        this.daoService = daoService;
        this.onRoute = new EventEmitter();
        this.onPush = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    DistrictGridComponent.prototype.ngOnInit = function () {
    };
    DistrictGridComponent.prototype.addDistrict = function (regionId) {
        this.onPush.emit(regionId);
    };
    DistrictGridComponent.prototype.remove = function (districtId) {
        this.onRemove.emit(districtId);
    };
    DistrictGridComponent.prototype.routeChanged = function () {
        this.onRoute.emit();
    };
    Object.defineProperty(DistrictGridComponent.prototype, "posibleRegions", {
        get: function () {
            return this.daoService.getRegionListObservable();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DistrictGridComponent.prototype, "districtList", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], DistrictGridComponent.prototype, "editable", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], DistrictGridComponent.prototype, "onRoute", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], DistrictGridComponent.prototype, "onPush", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], DistrictGridComponent.prototype, "onRemove", void 0);
    DistrictGridComponent = __decorate([
        Component({
            selector: 'app-district-grid',
            templateUrl: './district-grid.component.html',
            styleUrls: ['./district-grid.component.css']
        }), 
        __metadata('design:paramtypes', [DaoService])
    ], DistrictGridComponent);
    return DistrictGridComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/districts/district-grid/district-grid.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var district_1 = require("../../../../dao/model/district");
var DistrictGridComponent = (function () {
    function DistrictGridComponent(daoService) {
        this.daoService = daoService;
        this.onRoute = new core_1.EventEmitter();
    }
    DistrictGridComponent.prototype.ngOnInit = function () {
    };
    DistrictGridComponent.prototype.addDistrict = function (region) {
        if (region) {
            this.districtList.push(district_1.District.newInstance(region));
        }
    };
    DistrictGridComponent.prototype.remove = function (district) {
        this.districtList.splice(this.districtList.indexOf(district, 0), 1);
    };
    DistrictGridComponent.prototype.routeChanged = function () {
        this.onRoute.emit();
    };
    Object.defineProperty(DistrictGridComponent.prototype, "posibleRegions", {
        get: function () {
            // Necessary because of JS function scope
            var self = this;
            return this.daoService.getRegions().filter(function (value) {
                for (var i = 0; i < self.districtList.length; i++) {
                    if (self.districtList[i].region.id === value.id) {
                        return false;
                    }
                }
                return true;
            });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], DistrictGridComponent.prototype, "districtList", void 0);
    __decorate([
        core_1.Input()
    ], DistrictGridComponent.prototype, "editable", void 0);
    __decorate([
        core_1.Output()
    ], DistrictGridComponent.prototype, "onRoute", void 0);
    DistrictGridComponent = __decorate([
        core_1.Component({
            selector: 'app-district-grid',
            templateUrl: './district-grid.component.html',
            styleUrls: ['./district-grid.component.css']
        })
    ], DistrictGridComponent);
    return DistrictGridComponent;
}());
exports.DistrictGridComponent = DistrictGridComponent;

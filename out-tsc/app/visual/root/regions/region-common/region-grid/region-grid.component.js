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
export var RegionGridComponent = (function () {
    function RegionGridComponent() {
        this.onView = new EventEmitter();
    }
    RegionGridComponent.prototype.ngOnInit = function () {
        this.filteredRegionList = this.regionList;
    };
    Object.defineProperty(RegionGridComponent.prototype, "filteredRegionList", {
        get: function () {
            return this._filteredRegionList;
        },
        set: function (value) {
            this._filteredRegionList = value;
        },
        enumerable: true,
        configurable: true
    });
    RegionGridComponent.prototype.view = function (id) {
        this.onView.emit(id);
    };
    Object.defineProperty(RegionGridComponent.prototype, "cardColClass", {
        get: function () {
            if (this.big) {
                return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
            }
            else {
                return 'col-xs-12 col-sm-6 col-md-4';
            }
        },
        enumerable: true,
        configurable: true
    });
    RegionGridComponent.prototype.search = function (filtered) {
        this.filteredRegionList = filtered;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], RegionGridComponent.prototype, "regionList", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], RegionGridComponent.prototype, "searchable", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], RegionGridComponent.prototype, "big", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], RegionGridComponent.prototype, "onView", void 0);
    RegionGridComponent = __decorate([
        Component({
            selector: 'app-region-grid',
            templateUrl: './region-grid.component.html',
            styleUrls: ['./region-grid.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], RegionGridComponent);
    return RegionGridComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region-common/region-grid/region-grid.component.js.map
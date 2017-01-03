var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Region } from "../../../../../dao/model/region";
export var RegionResumeComponent = (function () {
    function RegionResumeComponent() {
        this.onRemove = new EventEmitter();
        this.onView = new EventEmitter();
    }
    RegionResumeComponent.prototype.view = function () {
        this.onView.emit(this.region.id);
    };
    RegionResumeComponent.prototype.remove = function () {
        this.onRemove.emit(this.region);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Region)
    ], RegionResumeComponent.prototype, "region", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], RegionResumeComponent.prototype, "onRemove", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], RegionResumeComponent.prototype, "onView", void 0);
    RegionResumeComponent = __decorate([
        Component({
            selector: 'app-region-resume',
            templateUrl: './region-resume.component.html',
            styleUrls: ['./region-resume.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], RegionResumeComponent);
    return RegionResumeComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region-common/region-resume/region-resume.component.js.map
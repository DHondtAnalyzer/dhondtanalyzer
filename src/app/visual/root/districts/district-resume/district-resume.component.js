"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DistrictResumeComponent = (function () {
    function DistrictResumeComponent(route) {
        this.route = route;
        this.onRemove = new core_1.EventEmitter();
        this.onRoute = new core_1.EventEmitter();
    }
    DistrictResumeComponent.prototype.ngOnInit = function () {
        if (!this.district.region || !this.district.census ||
            !this.district.seats) {
            this.editing = true;
        }
    };
    DistrictResumeComponent.prototype.save = function () {
        this.editing = false;
    };
    DistrictResumeComponent.prototype.edit = function () {
        this.editing = true;
    };
    DistrictResumeComponent.prototype.view = function () {
        this.onRoute.emit();
        this.route.navigate(['/app/regions', this.district.region.id]);
    };
    DistrictResumeComponent.prototype.remove = function () {
        this.onRemove.emit(this.district);
    };
    __decorate([
        core_1.Input()
    ], DistrictResumeComponent.prototype, "district", void 0);
    __decorate([
        core_1.Output()
    ], DistrictResumeComponent.prototype, "onRemove", void 0);
    __decorate([
        core_1.Output()
    ], DistrictResumeComponent.prototype, "onRoute", void 0);
    DistrictResumeComponent = __decorate([
        core_1.Component({
            selector: 'app-district-resume',
            templateUrl: 'district-resume.component.html',
            styleUrls: ['district-resume.component.css']
        })
    ], DistrictResumeComponent);
    return DistrictResumeComponent;
}());
exports.DistrictResumeComponent = DistrictResumeComponent;

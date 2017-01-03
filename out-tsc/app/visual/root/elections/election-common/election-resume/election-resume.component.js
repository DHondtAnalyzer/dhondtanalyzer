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
import { Election } from "../../../../../dao/model/election";
export var ElectionResumeComponent = (function () {
    function ElectionResumeComponent() {
        this.onRemove = new EventEmitter();
        this.onView = new EventEmitter();
    }
    ElectionResumeComponent.prototype.view = function () {
        this.onView.emit(this.election.id);
    };
    ElectionResumeComponent.prototype.remove = function () {
        this.onRemove.emit(this.election);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Election)
    ], ElectionResumeComponent.prototype, "election", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], ElectionResumeComponent.prototype, "editable", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ElectionResumeComponent.prototype, "onRemove", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ElectionResumeComponent.prototype, "onView", void 0);
    ElectionResumeComponent = __decorate([
        Component({
            selector: 'app-election-resume',
            templateUrl: './election-resume.component.html',
            styleUrls: ['./election-resume.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ElectionResumeComponent);
    return ElectionResumeComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election-common/election-resume/election-resume.component.js.map
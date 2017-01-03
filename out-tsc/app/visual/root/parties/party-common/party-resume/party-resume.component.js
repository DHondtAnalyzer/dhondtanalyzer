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
import { Party } from "../../../../../dao/model/party";
export var PartyResumeComponent = (function () {
    function PartyResumeComponent() {
        this.onRemove = new EventEmitter();
        this.onView = new EventEmitter();
    }
    PartyResumeComponent.prototype.view = function () {
        this.onView.emit(this.party.id);
    };
    PartyResumeComponent.prototype.remove = function () {
        this.onRemove.emit(this.party.id);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Party)
    ], PartyResumeComponent.prototype, "party", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PartyResumeComponent.prototype, "editable", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PartyResumeComponent.prototype, "onRemove", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PartyResumeComponent.prototype, "onView", void 0);
    PartyResumeComponent = __decorate([
        Component({
            selector: 'app-party-resume',
            templateUrl: './party-resume.component.html',
            styleUrls: ['./party-resume.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], PartyResumeComponent);
    return PartyResumeComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/parties/party-common/party-resume/party-resume.component.js.map
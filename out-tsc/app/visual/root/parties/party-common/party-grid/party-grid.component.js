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
import { DaoService } from "../../../../../dao/dao.service";
export var PartyGridComponent = (function () {
    function PartyGridComponent(daoService) {
        this.daoService = daoService;
        this.onView = new EventEmitter();
        this.onPush = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    PartyGridComponent.prototype.ngOnInit = function () {
        this.filteredPartyList = this.partyList;
    };
    PartyGridComponent.prototype.ngOnChanges = function (changes) {
        this.filteredPartyList = this.partyList;
    };
    Object.defineProperty(PartyGridComponent.prototype, "filteredPartyList", {
        get: function () {
            return this._filteredPartyList;
        },
        set: function (value) {
            this._filteredPartyList = value;
        },
        enumerable: true,
        configurable: true
    });
    PartyGridComponent.prototype.add = function (id) {
        this.onPush.emit(id);
    };
    PartyGridComponent.prototype.remove = function (id) {
        this.onRemove.emit(id);
    };
    PartyGridComponent.prototype.view = function (id) {
        this.onView.emit(id);
    };
    Object.defineProperty(PartyGridComponent.prototype, "posibleParties", {
        get: function () {
            // Necessary because of JS function scope
            var self = this;
            return this.daoService.getPartyListObservable().filter(function (value) {
                //TODO
                return true;
                /*
                for (let i: number = 0; i < self.filteredPartyList.length; i++) {
                    if (self.partyList[i].id === value.id) {
                        return false;
                    }
                }
                return true;
                */
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PartyGridComponent.prototype, "cardColClass", {
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
    PartyGridComponent.prototype.search = function (filtered) {
        this.filteredPartyList = filtered;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PartyGridComponent.prototype, "partyList", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PartyGridComponent.prototype, "editable", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PartyGridComponent.prototype, "searchable", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PartyGridComponent.prototype, "big", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PartyGridComponent.prototype, "onView", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PartyGridComponent.prototype, "onPush", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PartyGridComponent.prototype, "onRemove", void 0);
    PartyGridComponent = __decorate([
        Component({
            selector: 'app-party-grid',
            templateUrl: './party-grid.component.html',
            styleUrls: ['./party-grid.component.css']
        }), 
        __metadata('design:paramtypes', [DaoService])
    ], PartyGridComponent);
    return PartyGridComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/parties/party-common/party-grid/party-grid.component.js.map
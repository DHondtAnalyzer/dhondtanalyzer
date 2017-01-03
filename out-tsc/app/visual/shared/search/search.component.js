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
import { AppListObservable } from "../../../dao/app-list-observable";
export var SearchComponent = (function () {
    function SearchComponent() {
        this.query = '';
        this.placeholder = 'Search...';
        this.onSearch = new EventEmitter();
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.filter = function () {
        var _this = this;
        this.onSearch.emit(this.initialList.map(function (list) {
            return list.filter(function (value) { return value.name.toLowerCase()
                .indexOf(_this.query.toLowerCase()) > -1; });
        }));
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], SearchComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', AppListObservable)
    ], SearchComponent.prototype, "initialList", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "onSearch", void 0);
    SearchComponent = __decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SearchComponent);
    return SearchComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/search/search.component.js.map
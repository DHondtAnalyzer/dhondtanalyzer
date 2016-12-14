"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SearchComponent = (function () {
    function SearchComponent() {
        this.query = '';
        this.placeholder = 'Search...';
        this.onSearch = new core_1.EventEmitter();
    }
    SearchComponent.prototype.filter = function () {
        var filteredList;
        if (this.query) {
            filteredList = this.initialList.filter(function (value) {
                return value.name.toLowerCase()
                    .indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
            filteredList = this.initialList;
        }
        this.onSearch.emit(filteredList);
    };
    __decorate([
        core_1.Input()
    ], SearchComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input()
    ], SearchComponent.prototype, "initialList", void 0);
    __decorate([
        core_1.Output()
    ], SearchComponent.prototype, "onSearch", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css']
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;

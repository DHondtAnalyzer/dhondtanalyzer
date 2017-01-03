var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
export var ElectionGridComponent = (function () {
    function ElectionGridComponent() {
        this.onView = new EventEmitter();
    }
    ElectionGridComponent.prototype.ngOnInit = function () {
        this.filteredElectionList = this.electionList;
    };
    ElectionGridComponent.prototype.ngOnChanges = function (changes) {
        this.filteredElectionList = this.electionList;
    };
    Object.defineProperty(ElectionGridComponent.prototype, "filteredElectionList", {
        get: function () {
            return this._filteredElectionList;
        },
        set: function (value) {
            this._filteredElectionList = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param id
     */
    ElectionGridComponent.prototype.goToElection = function (id) {
        this.onView.emit(id);
    };
    Object.defineProperty(ElectionGridComponent.prototype, "cardColClass", {
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
    ElectionGridComponent.prototype.search = function (filtered) {
        this.filteredElectionList = filtered;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ElectionGridComponent.prototype, "electionList", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], ElectionGridComponent.prototype, "searchable", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], ElectionGridComponent.prototype, "big", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ElectionGridComponent.prototype, "onView", void 0);
    ElectionGridComponent = __decorate([
        Component({
            selector: 'app-election-grid',
            templateUrl: './election-grid.component.html',
            styleUrls: ['./election-grid.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], ElectionGridComponent);
    return ElectionGridComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election-common/election-grid/election-grid.component.js.map
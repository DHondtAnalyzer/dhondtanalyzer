var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AppListObservable } from "../../../dao/app-list-observable";
/**
 *
 *
 *
 * Based on: http://4dev.tech/2016/03/tutorial-creating-an-angular2-autocomplete/
 */
export var AutoCompleteInputComponent = (function () {
    function AutoCompleteInputComponent(elementRef) {
        this.elementRef = elementRef;
        this.query = '';
        this.findAttribute = 'name';
        this.selectedItem = new EventEmitter();
    }
    AutoCompleteInputComponent.prototype.filter = function () {
        var _this = this;
        this.filtered = this.items.map(function (items) {
            return items.filter(function (value) {
                return value[_this.findAttribute].toLowerCase()
                    .indexOf(_this.query.toLowerCase()) > -1;
            });
        });
    };
    AutoCompleteInputComponent.prototype.select = function (item) {
        this.query = item[this.findAttribute];
        this.selectedItem.emit(item.id);
        if (this.autoClean) {
            this.query = '';
        }
        this.filtered = this.items.map(function (items) {
            return items.filter(function (value) { return false; });
        });
    };
    AutoCompleteInputComponent.prototype.handleClick = function (event) {
        var clickedComponent = event.target;
        var inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filtered = this.items.map(function (items) {
                return items.filter(function (value) { return false; });
            });
        }
    };
    Object.defineProperty(AutoCompleteInputComponent.prototype, "inputName", {
        get: function () {
            return this.placeholder.replace(/ /g, "-").toLocaleLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(), 
        __metadata('design:type', AppListObservable)
    ], AutoCompleteInputComponent.prototype, "items", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], AutoCompleteInputComponent.prototype, "findAttribute", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], AutoCompleteInputComponent.prototype, "autoClean", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], AutoCompleteInputComponent.prototype, "placeholder", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AutoCompleteInputComponent.prototype, "selectedItem", void 0);
    AutoCompleteInputComponent = __decorate([
        Component({
            selector: 'app-autocomplete-input',
            templateUrl: './autocomplete-input.component.html',
            host: {
                '(document:click)': 'handleClick($event)',
            },
            styleUrls: ['./autocomplete-input.component.css']
        }), 
        __metadata('design:paramtypes', [ElementRef])
    ], AutoCompleteInputComponent);
    return AutoCompleteInputComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/autocomplete-input/autocomplete-input.component.js.map
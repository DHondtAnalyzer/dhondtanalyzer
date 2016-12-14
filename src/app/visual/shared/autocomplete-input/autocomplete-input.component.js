"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/**
 *
 *
 *
 * Based on: http://4dev.tech/2016/03/tutorial-creating-an-angular2-autocomplete/
 */
var AutoCompleteInputComponent = (function () {
    function AutoCompleteInputComponent(elementRef) {
        this.elementRef = elementRef;
        this.query = '';
        this.filtered = [];
        this.findAttribute = 'name';
        this.selectedItem = new core_1.EventEmitter();
    }
    AutoCompleteInputComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filtered = this.items.filter(function (value) {
                return value[this.findAttribute].toLowerCase()
                    .indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }
        else {
            this.filtered = [];
        }
    };
    AutoCompleteInputComponent.prototype.select = function (item) {
        this.query = item[this.findAttribute];
        this.selectedItem.emit(item);
        if (this.autoClean) {
            this.query = '';
        }
        this.filtered = [];
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
            this.filtered = [];
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
        core_1.Input()
    ], AutoCompleteInputComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteInputComponent.prototype, "findAttribute", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteInputComponent.prototype, "autoClean", void 0);
    __decorate([
        core_1.Input()
    ], AutoCompleteInputComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Output()
    ], AutoCompleteInputComponent.prototype, "selectedItem", void 0);
    AutoCompleteInputComponent = __decorate([
        core_1.Component({
            selector: 'app-autocomplete-input',
            templateUrl: './autocomplete-input.component.html',
            host: {
                '(document:click)': 'handleClick($event)',
            },
            styleUrls: ['./autocomplete-input.component.css']
        })
    ], AutoCompleteInputComponent);
    return AutoCompleteInputComponent;
}());
exports.AutoCompleteInputComponent = AutoCompleteInputComponent;

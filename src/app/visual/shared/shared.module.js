"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var toolbar_component_1 = require("./toolbar/toolbar.component");
var container_component_1 = require("./container/container.component");
var autocomplete_input_component_1 = require("./autocomplete-input/autocomplete-input.component");
var common_1 = require("@angular/common");
var search_component_1 = require("./search/search.component");
/**
 * Clase AppModule. Implementa la funcionalidad de un Modulo.
 *
 * AppModule es el módulo raíz de la aplicación.
 */
var SharedModule = (function () {
    /**
     * Constructor de la clase.
     */
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                toolbar_component_1.ToolbarComponent,
                container_component_1.ContainerComponent,
                autocomplete_input_component_1.AutoCompleteInputComponent,
                search_component_1.SearchComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MaterialModule.forRoot(),
            ],
            exports: [
                toolbar_component_1.ToolbarComponent,
                container_component_1.ContainerComponent,
                autocomplete_input_component_1.AutoCompleteInputComponent,
                search_component_1.SearchComponent,
            ],
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var election_routing_module_1 = require("./election-routing.module");
var election_list_component_1 = require("./election-list/election-list.component");
var election_detail_component_1 = require("./election-detail/election-detail.component");
var election_common_module_1 = require("../election-common/election-common.module");
var party_common_module_1 = require("../../parties/party-common/party-common.module");
var district_common_module_1 = require("../../districts/district-common.module");
/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
var ElectionModule = (function () {
    /**
     * Constructor de la clase.
     */
    function ElectionModule() {
    }
    ElectionModule = __decorate([
        core_1.NgModule({
            declarations: [
                election_list_component_1.ElectionListComponent,
                election_detail_component_1.ElectionDetailComponent,
            ],
            entryComponents: [
                election_detail_component_1.ElectionDetailComponent,
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                material_1.MaterialModule,
                election_routing_module_1.ElectionRoutingModule,
                election_common_module_1.ElectionCommonModule,
                party_common_module_1.PartyCommonModule,
                district_common_module_1.DistrictCommonModule,
            ],
            exports: [],
            providers: [],
        })
    ], ElectionModule);
    return ElectionModule;
}());
exports.ElectionModule = ElectionModule;

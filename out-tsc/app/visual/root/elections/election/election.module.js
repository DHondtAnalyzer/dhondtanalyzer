var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { ElectionRoutingModule } from "./election-routing.module";
import { ElectionListComponent } from "./election-list/election-list.component";
import { ElectionDetailComponent } from "./election-detail/election-detail.component";
import { ElectionCommonModule } from "../election-common/election-common.module";
import { PartyCommonModule } from "../../parties/party-common/party-common.module";
import { DistrictCommonModule } from "../../districts/district-common.module";
/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
export var ElectionModule = (function () {
    /**
     * Constructor de la clase.
     */
    function ElectionModule() {
    }
    ElectionModule = __decorate([
        NgModule({
            declarations: [
                ElectionListComponent,
                ElectionDetailComponent,
            ],
            entryComponents: [
                ElectionDetailComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule,
                ElectionRoutingModule,
                ElectionCommonModule,
                PartyCommonModule,
                DistrictCommonModule,
            ],
            exports: [],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], ElectionModule);
    return ElectionModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election/election.module.js.map
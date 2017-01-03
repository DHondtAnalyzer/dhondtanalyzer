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
import { PartyRoutingModule } from "./party-routing.module";
import { PartyListComponent } from "./party-list/party-list.component";
import { PartyDetailComponent } from "./party-detail/party-detail.component";
import { PartyCommonModule } from "../party-common/party-common.module";
import { ElectionCommonModule } from "../../elections/election-common/election-common.module";
/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
export var PartyModule = (function () {
    /**
     * Constructor de la clase.
     */
    function PartyModule() {
    }
    PartyModule = __decorate([
        NgModule({
            declarations: [
                PartyListComponent,
                PartyDetailComponent,
            ],
            entryComponents: [
                PartyDetailComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                MaterialModule,
                PartyRoutingModule,
                PartyCommonModule,
                ElectionCommonModule,
            ],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], PartyModule);
    return PartyModule;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/parties/party/party.module.js.map
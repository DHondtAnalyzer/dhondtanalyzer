import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {ElectionRoutingModule} from "./election-routing.module";

import {ElectionListComponent} from "./election-list/election-list.component";
import {ElectionDetailComponent} from "./election-detail/election-detail.component";
import {DistrictModule} from "../districts/district.module";
import {PartyModule} from "../parties/party.module";
import { ElectionGridComponent } from './election-grid/election-grid.component';
import {ElectionCommonModule} from "./election-common.module";
import {PartyCommonModule} from "../parties/party-common.module";
import {DistrictCommonModule} from "../districts/district-common.module";

/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
@NgModule({
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
    exports: [
    ],
    providers: [
    ],
})
export class ElectionModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

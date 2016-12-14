import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {PartyRoutingModule} from "./party-routing.module";


import {PartyListComponent} from "./party-list/party-list.component";
import {PartyDetailComponent} from "./party-detail/party-detail.component";
import {PartyCommonModule} from "../party-common/party-common.module";
import {ElectionCommonModule} from "../../elections/election-common/election-common.module";


/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
@NgModule({
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
})
export class PartyModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

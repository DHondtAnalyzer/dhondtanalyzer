import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {PartyRoutingModule} from "./party-routing.module";

import {PartyListComponent} from "./party-list/party-list.component";
import {PartyDetailComponent} from "./party-detail/party-detail.component";


/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
@NgModule({
    declarations: [
        PartyListComponent,
        PartyDetailComponent
    ],
    entryComponents: [
        PartyDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        PartyRoutingModule
    ],
    providers: []
})
export class PartyModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

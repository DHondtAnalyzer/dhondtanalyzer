import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {PartyGridComponent} from './party-grid/party-grid.component';
import {AutoCompleteInputComponent} from "../../shared/autocomplete-input/autocomplete-input.component";


/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
@NgModule({
    declarations: [
        PartyGridComponent,
        AutoCompleteInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
    ],
    exports: [
        PartyGridComponent,
    ],
    providers: [],
})
export class PartyCommonModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

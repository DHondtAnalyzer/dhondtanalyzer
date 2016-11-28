import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {ElectionRoutingModule} from "./election-routing.module";

import {ElectionListComponent} from "./election-list/election-list.component";
import {ElectionDetailComponent} from "./election-detail/election-detail.component";
import {DistrictModule} from "../districts/district.module";

/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
@NgModule({
    declarations: [
        ElectionListComponent,
        ElectionDetailComponent
    ],
    entryComponents: [
        ElectionDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        DistrictModule,
        ElectionRoutingModule
    ],
    providers: []
})
export class ElectionModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {ElectionGridComponent} from './election-grid/election-grid.component';
import {SharedModule} from "../../shared/shared.module";

/**
 * Clase ElectionModule. Implementa la funcionalidad de un Modulo.
 *
 * ElectionModule es el módulo que implementa los componentes necesarios para
 * visualizar las Eleciones.
 */
@NgModule({
    declarations: [
        ElectionGridComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        ElectionGridComponent,
    ],
    providers: [],
})
export class ElectionCommonModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

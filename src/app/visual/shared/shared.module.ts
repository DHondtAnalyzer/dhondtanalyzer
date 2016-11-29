import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';

import {MaterialModule} from '@angular/material';
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {ContainerComponent} from "./container/container.component";
import {AutoCompleteInputComponent} from "./autocomplete-input/autocomplete-input.component";
import {CommonModule} from "@angular/common";


/**
 * Clase AppModule. Implementa la funcionalidad de un Modulo.
 *
 * AppModule es el módulo raíz de la aplicación.
 */
@NgModule({
    declarations: [
        ToolbarComponent,
        ContainerComponent,
        AutoCompleteInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule.forRoot(),
    ],
    exports: [
        ToolbarComponent,
        ContainerComponent,
        AutoCompleteInputComponent,
    ],
})
export class SharedModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

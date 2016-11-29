import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {FormsModule} from "@angular/forms";
import {RegionRoutingModule} from "./region-routing.module";
import { RegionListComponent } from './region-list/region-list.component';
import { RegionDetailComponent } from './region-detail/region-detail.component';
import {ElectionCommonModule} from "../elections/election-common.module";


/**
 * Clase RegionModule. Implementa la funcionalidad de un Modulo.
 *
 * RootModule es el módulo raíz de la aplicación una vez el usuario se ha
 * identificado en el sistema.
 */
@NgModule({
    declarations: [
        RegionListComponent,
        RegionDetailComponent
    ],
    entryComponents: [
        RegionDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        RegionRoutingModule,
        ElectionCommonModule,
    ],
})
export class RegionModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

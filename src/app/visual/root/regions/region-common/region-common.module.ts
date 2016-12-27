import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {SharedModule} from "../../../shared/shared.module";
import {DaoModule} from "../../../../dao/dao.module";
import {RegionGridComponent} from "./region-grid/region-grid.component";
import {RegionResumeComponent} from "./region-resume/region-resume.component";


/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
@NgModule({
    declarations: [
        RegionGridComponent,
        RegionResumeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule,
        DaoModule
    ],
    exports: [
        RegionGridComponent,
    ],
    providers: [],
})
export class RegionCommonModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

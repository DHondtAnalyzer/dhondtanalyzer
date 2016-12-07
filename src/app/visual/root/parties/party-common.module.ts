import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {MaterialModule} from "@angular/material";

import {PartyGridComponent} from './party-grid/party-grid.component';
import {SharedModule} from "../../shared/shared.module";
import {DaoModule} from "../../../dao/dao.module";
import {PartyResumeComponent} from "./party-resume/party-resume.component";


/**
 * Clase PartyModule. Implementa la funcionalidad de un Modulo.
 *
 * PartyModule es el módulo que implementa los componentes necesarios para
 * visualizar los Partidos Políticos.
 */
@NgModule({
    declarations: [
        PartyGridComponent,
        PartyResumeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule,
        DaoModule
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

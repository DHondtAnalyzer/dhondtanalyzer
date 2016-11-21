import { NgModule } from '@angular/core';

import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {LandingRoutingModule} from "./landing-routing.module";
import {LandingComponent} from "./landing.component";

/**
 * Clase LandingModule. Implementa la funcionalidad de un Modulo.
 *
 * LandingModule es el módulo que representa la parte externa de la aplicación.
 */

@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LandingRoutingModule,
    ],
    providers: []
})
export class LandingModule { }

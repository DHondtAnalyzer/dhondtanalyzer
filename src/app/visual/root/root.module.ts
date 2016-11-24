import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {ToolbarComponent} from "../shared/toolbar/toolbar.component";
import {ContainerComponent} from "../shared/container/container.component";
import {HomeComponent} from "./home/home.component";
import {RootComponent} from "./root.component";
import {RootRoutingModule} from "./root-routing.module";
import {DialogService} from "../shared/dialog/dialog.service";
import {RouterService} from "../shared/router/router.service";


/**
 * Clase RootModule. Implementa la funcionalidad de un Modulo.
 *
 * RootModule es el módulo raíz de la aplicación una vez el usuario se ha
 * identificado en el sistema.
 */
@NgModule({
    declarations: [
        ToolbarComponent,
        ContainerComponent,
        HomeComponent,
        RootComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RootRoutingModule
    ],
    providers: [
        DialogService,
        RouterService
    ]
})
export class RootModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

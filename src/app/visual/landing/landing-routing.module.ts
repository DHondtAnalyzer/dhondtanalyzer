import { NgModule }     from '@angular/core';

import { RouterModule } from '@angular/router';

import { LandingComponent } from "./landing.component";


/**
 * Clase LandingRoutingModule. Implementa la funcionalidad de un Módulo.
 *
 * LandingRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación dentro del módulo Landing.
 */
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: LandingComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LandingRoutingModule {}

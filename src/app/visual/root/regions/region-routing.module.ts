import {NgModule}     from '@angular/core';

import {RouterModule} from '@angular/router';
import {RegionListComponent} from "./region-list/region-list.component";


/**
 * Clase ElectionRoutingModule. Implementa la funcionalidad de un Módulo.
 *
 * ElectionRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación dentro del módulo Election.
 */
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RegionListComponent
            },
            {
                path: ':id',
                component: RegionListComponent
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RegionRoutingModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

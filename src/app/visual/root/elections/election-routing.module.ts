import {NgModule}     from '@angular/core';

import {RouterModule} from '@angular/router';

import {ElectionListComponent} from "./election-list/election-list.component";


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
                children: [
                    {path: '', component: ElectionListComponent},
                    {path: ':id', component: ElectionListComponent},
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ElectionRoutingModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

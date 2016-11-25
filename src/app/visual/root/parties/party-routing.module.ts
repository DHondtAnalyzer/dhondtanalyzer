import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import {PartyListComponent} from "./party-list/party-list.component";
import {PartyDetailComponent} from "./party-detail/party-detail.component";


/**
 * Clase PartyRoutingModule. Implementa la funcionalidad de un Módulo.
 *
 * PartyRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación dentro del módulo Party.
 */
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: PartyListComponent
            },
            {
                path: ':id', component: PartyListComponent
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PartyRoutingModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

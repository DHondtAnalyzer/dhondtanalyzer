import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from "./shared/auth/auth.guard";


/**
 * Clase AppRoutingModule.Implementa la funcionalidad de un Módulo.
 *
 * AppRoutingModule es la clase encarga de redistribuir el tráfico principal
 * de la aplicación hacia los módulos Landing y Root, que se corresponden con
 * la parte externa de la aplicación y la interna.
 *
 * Para poder acceder al contenido de RootModule es necesario haberse
 * identificado previamente en el sistema. Esta comprobación se realiza en la
 * clase AuthGuard.
 */
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                loadChildren: 'app/visual/landing/landing.module#LandingModule'
            },
            {
                path: 'app',
                loadChildren: 'app/visual/root/root.module#RootModule',
                canActivate: [AuthGuard]
            },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

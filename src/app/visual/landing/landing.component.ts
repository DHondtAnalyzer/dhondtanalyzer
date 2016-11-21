import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";


/**
 * Clase LandingComponent. Implementa la funcionalidad de un Componente.
 *
 * LandingComponent es el el componente que se muestra al acceder a la
 * aplicación. Aquí es dónde se puede obtener información acerca de lo
 * que se puede hacer con la misma.
 *
 * En sus componentes hijos  es donde se implementa la funcionalidad de
 * registro y de inicio de sesión.
 */
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {


    private title: string;


    /**
     * Constructor de la clase.
     *
     * @param router Servicio Router que permite la redirección hacia otras
     * rutas dentro de la aplicación.
     */
    constructor(private router: Router,) {
    }


    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit.
     */
    ngOnInit() {
        this.title = 'DHondtAnalyzer'
    }


    /**
     * Función goTo.
     *
     * Redirige al usuario hacia la ruta indicada como parámetro.
     *
     * @param url string que representa la ruta relativa hacia la cuál se
     * pretende navegar.
     */
    goTo(url: string): void {
        this.router.navigate([url])
    }


}

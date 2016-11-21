import {Component} from '@angular/core';


/**
 * Clase ContainerComponent. Implementa la funcionalidad de un Componente.
 *
 * ContainerComponent es un componente que actua como contenedor de contenido
 * aplicando márgenes y colocando apropiadamente el contenido que se añada en
 * su interior.
 */
@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css']
})
export class ContainerComponent {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

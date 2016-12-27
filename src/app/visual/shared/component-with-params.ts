import {Component} from "@angular/core";


/**
 * Interfaz ComponentWithParams.
 *
 * ComponentWithParams extiende el Component de Angular2 añadiendo la
 * posibilidad de asignar parámetros al inicializar el componente mediante
 * código.
 */
export interface ComponentWithParams extends Component {
    id: string;
}

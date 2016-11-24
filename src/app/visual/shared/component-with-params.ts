import {Component} from "@angular/core";
import {Model} from "../../dao/model/model";


/**
 * Interfaz ComponentWithParams.
 *
 * ComponentWithParams extiende el Component de Angular2 añadiendo la
 * posibilidad de asignar parámetros al inicializar el componente mediante
 * código.
 */
export interface ComponentWithParams extends Component {
    model: Model;
}

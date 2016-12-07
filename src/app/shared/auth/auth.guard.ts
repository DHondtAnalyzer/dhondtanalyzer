import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";


/**
 * Clase AuthGuard. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de permitir o denegar el acceso a la
 * aplicación dependiendo de si el usuario está identificado o no.
 */
@Injectable()
export class AuthGuard implements CanActivate {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }


    /**
     * Función canActivate.
     *
     * Es la implementación de la interfaz CanActivate, que se utiliza
     * para realizar comprobaciones de acceso a una ruta especifica.
     *
     * @returns {boolean} Representa si el usuario puede acceder a la ruta
     * en la cual se inyecta el servicio AuthGuard.
     */
    canActivate(): boolean {
        //TODO
        return true;
    }
}

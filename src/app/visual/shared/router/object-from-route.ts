import {Model} from "../../../dao/model/model";

/**
 * Interfaz ObjectFromRoute.
 *
 * Es utilizada para realizar las llamadas de respuesta (Callbacks) del
 * servicio router.
 */
export interface ObjectFromRoute {
    objectIdCallback(id: string): void;

    createCallback(): void;
}

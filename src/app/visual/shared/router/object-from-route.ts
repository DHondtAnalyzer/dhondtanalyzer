import {Model} from "../../../dao/model/model";

/**
 * Interfaz ObjectFromRoute.
 *
 * Es utilizada para realizar las llamadas de respuesta (Callbacks) del
 * servicio router.
 */
export interface ObjectFromRoute<T extends Model> {
    objectCallback(object: T): void;
}

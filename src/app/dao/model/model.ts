import {District} from "./district";
import {VoteCount} from "./vote-count";
import {Election} from "./election";
import {Party} from "./party";
import {Region} from "./region";


export interface ModelRaw {
  $exists: any;
  $key: string;
}

/**
 * Tipo Model.
 *
 * Con esta declaración se pretende poder identificar todos los modelos
 * de la aplicación mediante Model. Con esto se consigue la misma abstracción
 * que si se utilizase herencia o interfaces, solo que en este caso, para los
 * tipos.
 */
export declare type Model = District | Election | Party | Region | VoteCount;

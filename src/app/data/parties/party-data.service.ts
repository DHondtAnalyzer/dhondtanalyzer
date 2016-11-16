import {Injectable} from '@angular/core';
import {Party} from "./party";

@Injectable()
export class PartyDataService {

    constructor() {
    }

    getParties(): Party[]{

        let array: Party[] = [
            new Party("Partido Popular", "PP", "azul"),
            new Party("Partido Socialista", "PSOE", "rojo"),
            new Party("Podemos", "P", "morado"),
            new Party("Ciudadanos", "C", "naranja"),
        ];
        return array;
    }

}

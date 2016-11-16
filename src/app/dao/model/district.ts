/**
 * Created by garciparedes on 16/11/2016.
 */

import {Election} from "./election";
import {Region} from "./region";

export class District {

    seats: number;
    census: number;

    election: Election;
    region: Region;

    constructor(seats: number, census: number){
        this.seats = seats;
        this.census = census;
    }
}

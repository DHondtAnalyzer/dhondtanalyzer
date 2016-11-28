/**
 * Created by garciparedes on 16/11/2016.
 */

import {Election} from "./election";
import {Region} from "./region";
import {VoteCount} from "./vote-count";

export class District {

    id: string;

    seats: number;
    census: number;

    election: Election;

    region: Region;
    voteCountList: VoteCount[];

    constructor(region:Region, seats: number, census: number){
        this.region = region;
        this.seats = seats;
        this.census = census;
        this.voteCountList = [];
    }

    get name(){
        return this.region.name;
    }
}

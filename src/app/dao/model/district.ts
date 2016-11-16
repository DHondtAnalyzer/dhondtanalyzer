/**
 * Created by garciparedes on 16/11/2016.
 */

import {Election} from "./election";
import {Region} from "./region";
import {VoteCount} from "./vote-count";

export class District {

    seats: number;
    census: number;

    election: Election;

    region: Region;
    voteCountList: VoteCount[];

    constructor(election: Election, region:Region, seats: number, census: number){
        this.election = election;
        this.region = region;
        this.seats = seats;
        this.census = census;
    }
}

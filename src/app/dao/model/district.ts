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

    public static newInstance(region?:Region, seats?: number, census?: number): District {
        let district = new District(region, seats, census);

        region.districtList.push(district);

        return district;
    }
    constructor(region?:Region, seats?: number, census?: number){
        this.region = region;
        this.seats = seats;
        this.census = census;
        this.voteCountList = [];
    }

    get name(){
        if (this.region){
            return this.region.name;
        } else {
            return '';
        }
    }
}

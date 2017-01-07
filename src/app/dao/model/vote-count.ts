/**
 * Created by garciparedes on 16/11/2016.
 */

import {VoteType} from "./vote-type";
import {District} from "./district";
import {Party} from "./party";


export class VoteCount {

    id: string;

    count: number;
    type: VoteType;

    district: District;
    party: Party;


    public static newInstance(district: District, type: VoteType,
                              count: number, party?:Party): VoteCount {
        let voteCount = new VoteCount(district, type, count, party);

        district.voteCountList.push(voteCount);

        return voteCount;
    }

    constructor(district: District, type: VoteType, count: number, party?:Party){
        this.district = district;
        this.type =  type;
        this.count = count;
        this.party = party;
    }
}

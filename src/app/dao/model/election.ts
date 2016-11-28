/**
 * Created by garciparedes on 16/11/2016.
 */

import {ElectionType} from "./election-type";
import {District} from "./district";
import {Party} from "./party";

export class Election {

    id: string;

    name: string;
    date: Date;
    seats: number;
    type: ElectionType;

    districtList: District[];
    partyList: Party[];

    constructor(name?: string, date?: Date, seats?: number,
                type?: ElectionType, districtList?: District[], partyList?:Party[]){
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.type = type;
        this.districtList = districtList;
        this.partyList = partyList;
    }

}

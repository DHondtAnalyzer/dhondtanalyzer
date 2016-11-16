/**
 * Created by garciparedes on 16/11/2016.
 */

import {ElectionType} from "./election-type";
import {District} from "./district";

export class Election {

    name: string;
    date: Date;
    seats: number;
    type: ElectionType;

    districtList: District[];


    constructor(name: string, date: Date, seats: number, type: ElectionType){
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.type = type;
    }

}

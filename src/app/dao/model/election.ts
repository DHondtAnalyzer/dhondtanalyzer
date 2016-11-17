/**
 * Created by garciparedes on 16/11/2016.
 */

import {ElectionType} from "./election-type";
import {District} from "./district";
import {Party} from "./party";

export interface ElectionRaw{
  name: string;
  date: Date;
  seats: number;
  type: ElectionType;
}

export class Election {

    name: string;
    date: Date;
    seats: number;
    type: ElectionType;

    districtList: District[];
    partyList: Party[];

    // constructor(name: string, date: Date, seats: number,
    //             type: ElectionType, districtList?: District[], partyList?:Party[]){
    //     this.name = name;
    //     this.date = date;
    //     this.seats = seats;
    //     this.type = type;
    //     this.districtList = districtList;
    //     this.partyList = partyList;
    // }
    constructor(){}

    static fromRaw(raw: ElectionRaw){
      let instance = new Election();
      instance.name = raw.name;
      instance.date = raw.date;
      instance.seats = raw.seats;
      instance.type = raw.type;
      return instance;
    }
}

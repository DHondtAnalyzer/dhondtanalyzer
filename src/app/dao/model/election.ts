/**
 * Created by garciparedes on 16/11/2016.
 */

import {ElectionType} from "./election-type";
import {District} from "./district";
import {Party} from "./party";

export interface ElectionRaw{
  id: string;
  name: string;
  date: Date;
  seats: number;
  type: ElectionType;
}

export class Election {
    id: string;
    name: string;
    date: Date;
    seats: number;
    type: ElectionType;

    districtList: District[];
    partyList: Party[];

    public static newInstance(name?: string, date: Date = new Date(),
                              seats: number = 0, type?: ElectionType,
                              districtList: District[] = [], partyList: Party[] = []): Election {
        let election = new Election(name, date, seats, type, districtList, partyList);

        districtList.map(function (district) {
            district.election = election;
        });

        partyList.map(function (party) {
            party.electionList.push(election);
        });

        return election;
    }

    private constructor(name?: string, date: Date = new Date(), seats: number = 0,
                type?: ElectionType, districtList: District[] = [], partyList: Party[] = []) {
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.type = type;
        this.districtList = districtList;
        this.partyList = partyList;
    }
}

/**
 * Created by garciparedes on 16/11/2016.
 */

import {ElectionType} from "./election-type";
import {District} from "./district";
import {Party} from "./party";
import {AppList} from "../app-list";
import {AppListObservableObject} from "../app-list-observable-object";



export interface ElectionRaw {
  $exists: any;
  $key: string;
  id: string;
  name: string;
  date: Date;
  seats: number;
  type: ElectionType;
  districtList: any;
  partyList: any;
}


export class Election {
  id: string;
  name: string;
  date: Date;
  seats: number;
  type: ElectionType;

  districtList: AppListObservableObject<District>;
  partyList: AppListObservableObject<Party>;

  public static newInstance(name?: string, date: Date = new Date(),
                            seats: number = 0, type?: ElectionType,
                            districtList?: AppListObservableObject<District>,
                            partyList?: AppListObservableObject<Party>): Election {
    let election = new Election(null, name, date, seats, type, districtList, partyList);


    /*
     // TODO
     districtList.map(function (district) {
     district.election = election;
     });
     */

    /*
     // TODO
     partyList.map(function (party) {
     party.electionList.push(election);
     });
     */
    return election;
  }

  public static fromRaw(raw: ElectionRaw) {
    return new Election(
      raw.$key,
      raw.name,
      raw.date,
      raw.seats,
      raw.type,
      raw.districtList,
      raw.partyList,
    );
  }



  private constructor(key: string, name?: string, date: Date = new Date(), seats: number = 0,
                      type: ElectionType = ElectionType.GENERALES,
                      districtList: AppListObservableObject<District> = new AppListObservableObject<District>(),
                      partyList: AppListObservableObject<Party> = new AppListObservableObject<Party>()) {
    this.id = key;
    this.name = name;
    this.date = date;
    this.seats = seats;
    this.type = type;
    this.districtList = districtList;
    this.partyList = partyList;
  }
}

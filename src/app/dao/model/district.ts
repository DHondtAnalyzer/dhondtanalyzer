/**
 * Created by garciparedes on 16/11/2016.
 */

import {Election} from "./election";
import {Region} from "./region";
import {VoteCount} from "./vote-count";
import {AppObjectObservable} from "../app-object-observable";
import {BehaviorSubject} from "rxjs";
import {ModelRaw} from "./model";
import {AppListObservableObject} from "../app-list-observable-object";


export interface DistrictRaw extends ModelRaw {
  seats: number;
  census: number;
  election: any;
  region: any;
  voteCountList: any;
}



export class District {

  id: string;

  seats: number;
  census: number;

  election: AppObjectObservable<Election>;

  region: AppObjectObservable<Region>;
  voteCountList: AppListObservableObject<VoteCount>;

  public static newInstance(region?: AppObjectObservable<Region>,
                            election?: AppObjectObservable<Election>,
                            seats?: number, census?: number,
                            voteCountList?: AppListObservableObject<VoteCount>): District {
    let district = new District(null,region, election, seats, census, voteCountList);

    /*
    //TODO
     region.districtList.push(district);
     */
    return district;
  }


  public static fromRaw(raw: DistrictRaw){
    return new District(
      raw.$key,
      raw.region,
      raw.election,
      raw.seats,
      raw.census,
      raw.voteCountList
    );
  }

  constructor(key?: string, region?: AppObjectObservable<Region>,
              election?: AppObjectObservable<Election>, seats: number = 0, census: number = 0,
              voteCountList: AppListObservableObject<VoteCount>  = new AppListObservableObject<VoteCount>()) {
    this.id = key;
    this.region = region;
    this.election = election;
    this.seats = seats;
    this.census = census;
    this.voteCountList = voteCountList;
  }
}

/**
 * Created by garciparedes on 16/11/2016.
 */

import {Election} from "./election";
import {Region} from "./region";
import {VoteCount} from "./vote-count";
import {AppObjectObservable} from "../app-object-observable";
import {BehaviorSubject} from "rxjs";

export class District {

  id: string;

  seats: number;
  census: number;

  election: Election | AppObjectObservable<Election>;

  region: AppObjectObservable<Region>;
  voteCountList: VoteCount[];


  private nameSubscriber: BehaviorSubject<string>;

  public static newInstance(region?: AppObjectObservable<Region>,
                            seats?: number, census?: number): District {
    let district = new District(region, seats, census);

    /*
    //TODO
     region.districtList.push(district);
     */
    return district;
  }

  constructor(region?: AppObjectObservable<Region>, seats?: number, census?: number) {
    this.region = region;
    this.seats = seats;
    this.census = census;
    this.voteCountList = [];
  }
}

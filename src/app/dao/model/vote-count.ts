/**
 * Created by garciparedes on 16/11/2016.
 */

import {VoteType} from "./vote-type";
import {District} from "./district";
import {Party} from "./party";
import {ModelRaw} from "./model";
import {AppObjectObservable} from "../shared/app-object-observable";


export interface VoteCountRaw extends ModelRaw {
  count: number;
  type: VoteType;
  district: any;
  party: any;
}


export class VoteCount {

    id: string;

    count: number;
    type: VoteType;

  district: AppObjectObservable<District>;
  party: AppObjectObservable<Party>;


  public static newInstance(count: number = 0, type: VoteType = VoteType.VALID,
                            district: AppObjectObservable<District>,
                            party?: AppObjectObservable<Party>): VoteCount {

    return new VoteCount(null, count, type, district, party);
  }

  public static fromRaw(raw: VoteCountRaw){
    return new VoteCount(
      raw.$key,
      raw.count,
      raw.type,
      raw.district,
      raw.party
    );
  }

  constructor(key: string, count: number, type: VoteType,
              district: AppObjectObservable<District>,
              party?: AppObjectObservable<Party>) {
    this.id = key;
    this.district = district;
    this.type = type;
    this.count = count;
    this.party = party;
  }
}

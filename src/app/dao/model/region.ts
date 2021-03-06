import {District} from "./district";
import {Election} from "./election";
import {AppListObservableObject} from "../shared/app-list-observable-object";
import {ModelRaw} from "./model";


export interface RegionRaw extends ModelRaw {
  name: string;
  districtList: any;
}


export class Region {

    id: string;

    name: string;
    districtList: AppListObservableObject<District>;

  public static newInstance(name?: string): Region {
    return new Region(null, name);
  }


  public static fromRaw(raw: RegionRaw) {
    return new Region(
      raw.$key,
      raw.name,
      raw.districtList
    );
  }


  private constructor(key: string, name?: string,
                      districtList: AppListObservableObject<District> = new AppListObservableObject<District>()) {
    this.id = key;
    this.name = name;
    this.districtList = districtList;
  }

    get electionList(): Election[] {
        let electionList: Array<Election> = [];
        /*
        //TODO
        this.districtList.forEach(function (value) {
            electionList.push(value.election);
        });
        */
        return electionList
    }
}

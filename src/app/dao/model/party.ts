import {Election} from "./election";
import {AppList} from "../app-list";
import {AppListObservableObject} from "../app-list-observable-object";

export interface PartyRaw {
  $key: string;
  name: string;
  abbreviation: string;
  color: string;
  electionList: any;
}



export class Party {

  id: string;

  name: string;
  abbreviation: string;
  color: string;

  electionList: AppListObservableObject<Election>;

  public static newInstance(name?: string, abbreviation?: string,
                            color?: string, electionList?: AppListObservableObject<Election>): Party {
    let party = new Party(null,name, abbreviation, color, electionList);
    return party;
  }


  public static fromRaw(raw: PartyRaw){
    return new Party(
      raw.$key,
      raw.name,
      raw.abbreviation,
      raw.color,
      raw.electionList
    );
  }

  private constructor(key?: string, name?: string, abbreviation?: string, color?: string,
                      electionList: AppListObservableObject<Election> = new AppListObservableObject<Election>()) {
    this.id = key;
    this.name = name;
    this.abbreviation = abbreviation;
    this.color = color;
    this.electionList = electionList;
  }

}

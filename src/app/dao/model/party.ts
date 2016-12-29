import {Election} from "./election";
import {AppList} from "../app-list";


export class Party {

  id: string;

  name: string;
  abbreviation: string;
  color: string;

  electionList: AppList<Election>;

  public static newInstance(name?: string, abbreviation?: string,
                            color?: string, electionList?: AppList<Election>): Party {
    let party = new Party(name, abbreviation, color, electionList);
    return party;
  }

  private constructor(name?: string, abbreviation?: string, color?: string, electionList?: AppList<Election>) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.color = color;
    this.electionList = electionList;
  }

}

import {Election} from "./election";
export class Party {

    key: string;

    name: string;
    abbreviation: string;
    color: string;

    electionList: Election[];

    constructor(name?: string, abbreviation?: string, color?: string){
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
    }

}

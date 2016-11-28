import {Election} from "./election";
export class Party {

    id: string;

    name: string;
    abbreviation: string;
    color: string;

    electionList: Election[];

    constructor(name?: string, abbreviation?: string, color?: string){
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
        this.electionList = [];
    }

}

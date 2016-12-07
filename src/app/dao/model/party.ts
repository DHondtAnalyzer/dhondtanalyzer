import {Election} from "./election";
export class Party {

    id: string;

    name: string;
    abbreviation: string;
    color: string;

    electionList: Election[];

    public static newInstance(name?: string, abbreviation?: string, color?: string): Party {
        let district = new Party(name, abbreviation, color);
        return district;
    }

    private constructor(name?: string, abbreviation?: string, color?: string) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
        this.electionList = [];
    }

}

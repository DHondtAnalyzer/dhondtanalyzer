import {District} from "./district";
import {Election} from "./election";
import {Party} from "./party";
/**
 * Created by garciparedes on 16/11/2016.
 */
export class Region {

    id: string;

    name: string;
    districtList: District[];

    public static newInstance(name?:string): Region {
        let region = new Region(name);

        return region;
    }


    private constructor(name?: string) {
        this.name = name;
        this.districtList = [];
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

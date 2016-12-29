import {District} from "./district";
import {Election} from "./election";
import {AppListObservableObject} from "../app-list-observable-object";
/**
 * Created by garciparedes on 16/11/2016.
 */
export class Region {

    id: string;

    name: string;
    districtList: AppListObservableObject<District>;

    public static newInstance(name?:string): Region {
        let region = new Region(name);

        return region;
    }


    private constructor(name?: string, districtList?: AppListObservableObject<District>) {
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

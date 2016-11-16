import {District} from "./district";
/**
 * Created by garciparedes on 16/11/2016.
 */
export class Region {

    key: string;

    name: string;
    districtList: District[];

    constructor(name: string) {
        this.name = name;
    }
}

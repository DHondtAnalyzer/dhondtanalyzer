import {District} from "./district";
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
}

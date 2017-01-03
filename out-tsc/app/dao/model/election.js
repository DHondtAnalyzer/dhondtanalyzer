/**
 * Created by garciparedes on 16/11/2016.
 */
import { ElectionType } from "./election-type";
import { AppListObservableObject } from "../app-list-observable-object";
export var Election = (function () {
    function Election(key, name, date, seats, type, districtList, partyList) {
        if (date === void 0) { date = new Date(); }
        if (seats === void 0) { seats = 0; }
        if (type === void 0) { type = ElectionType.GENERALES; }
        if (districtList === void 0) { districtList = new AppListObservableObject(); }
        if (partyList === void 0) { partyList = new AppListObservableObject(); }
        this.id = key;
        this.name = name;
        this.date = date;
        this.seats = seats;
        this.type = type;
        this.districtList = districtList;
        this.partyList = partyList;
    }
    Election.newInstance = function (name, date, seats, type, districtList, partyList) {
        if (date === void 0) { date = new Date(); }
        if (seats === void 0) { seats = 0; }
        var election = new Election(null, name, date, seats, type, districtList, partyList);
        /*
         // TODO
         districtList.map(function (district) {
         district.election = election;
         });
         */
        /*
         // TODO
         partyList.map(function (party) {
         party.electionList.push(election);
         });
         */
        return election;
    };
    Election.fromRaw = function (raw) {
        return new Election(raw.$key, raw.name, raw.date, raw.seats, raw.type, raw.districtList, raw.partyList);
    };
    return Election;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/model/election.js.map
import { AppListObservableObject } from "../app-list-observable-object";
export var Party = (function () {
    function Party(key, name, abbreviation, color, electionList) {
        if (abbreviation === void 0) { abbreviation = ''; }
        if (color === void 0) { color = ''; }
        if (electionList === void 0) { electionList = new AppListObservableObject(); }
        this.id = key;
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
        this.electionList = electionList;
    }
    Party.newInstance = function (name, abbreviation, color, electionList) {
        var party = new Party(null, name, abbreviation, color, electionList);
        return party;
    };
    Party.fromRaw = function (raw) {
        return new Party(raw.$key, raw.name, raw.abbreviation, raw.color, raw.electionList);
    };
    return Party;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/model/party.js.map
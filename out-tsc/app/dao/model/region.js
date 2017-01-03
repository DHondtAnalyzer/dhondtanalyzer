import { AppListObservableObject } from "../app-list-observable-object";
export var Region = (function () {
    function Region(key, name, districtList) {
        if (districtList === void 0) { districtList = new AppListObservableObject(); }
        this.id = key;
        this.name = name;
        this.districtList = districtList;
    }
    Region.newInstance = function (name) {
        var region = new Region(null, name);
        return region;
    };
    Region.fromRaw = function (raw) {
        return new Region(raw.$key, raw.name, raw.districtList);
    };
    Object.defineProperty(Region.prototype, "electionList", {
        get: function () {
            var electionList = [];
            /*
            //TODO
            this.districtList.forEach(function (value) {
                electionList.push(value.election);
            });
            */
            return electionList;
        },
        enumerable: true,
        configurable: true
    });
    return Region;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/model/region.js.map
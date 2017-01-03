/**
 * Created by garciparedes on 16/11/2016.
 */
export var District = (function () {
    function District(key, region, election, seats, census) {
        if (seats === void 0) { seats = 0; }
        if (census === void 0) { census = 0; }
        this.id = key;
        this.region = region;
        this.election = election;
        this.seats = seats;
        this.census = census;
        this.voteCountList = [];
    }
    District.newInstance = function (region, election, seats, census) {
        var district = new District(null, region, election, seats, census);
        /*
        //TODO
         region.districtList.push(district);
         */
        return district;
    };
    District.fromRaw = function (raw) {
        return new District(raw.$key, raw.region, raw.election, raw.seats, raw.census);
    };
    return District;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/model/district.js.map
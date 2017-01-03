/**
 * Created by garciparedes on 16/11/2016.
 */
export var VoteCount = (function () {
    function VoteCount(district, type, count, party) {
        this.district = district;
        this.type = type;
        this.count = count;
        this.party = party;
    }
    VoteCount.newInstance = function (district, type, count, party) {
        var voteCount = new VoteCount(district, type, count, party);
        district.voteCountList.push(voteCount);
        return voteCount;
    };
    return VoteCount;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/model/vote-count.js.map
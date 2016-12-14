/**
 * Created by garciparedes on 16/11/2016.
 */
"use strict";
var District = (function () {
    function District(region, seats, census) {
        this.region = region;
        this.seats = seats;
        this.census = census;
        this.voteCountList = [];
    }
    District.newInstance = function (region, seats, census) {
        var district = new District(region, seats, census);
        region.districtList.push(district);
        return district;
    };
    Object.defineProperty(District.prototype, "name", {
        get: function () {
            if (this.region) {
                return this.region.name;
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    return District;
}());
exports.District = District;

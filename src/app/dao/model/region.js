"use strict";
/**
 * Created by garciparedes on 16/11/2016.
 */
var Region = (function () {
    function Region(name) {
        this.name = name;
        this.districtList = [];
    }
    Region.newInstance = function (name) {
        var region = new Region(name);
        return region;
    };
    Object.defineProperty(Region.prototype, "electionList", {
        get: function () {
            var electionList = [];
            this.districtList.forEach(function (value) {
                electionList.push(value.election);
            });
            return electionList;
        },
        enumerable: true,
        configurable: true
    });
    return Region;
}());
exports.Region = Region;

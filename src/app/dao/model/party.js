"use strict";
var Party = (function () {
    function Party(name, abbreviation, color) {
        this.name = name;
        this.abbreviation = abbreviation;
        this.color = color;
        this.electionList = [];
    }
    Party.newInstance = function (name, abbreviation, color) {
        var district = new Party(name, abbreviation, color);
        return district;
    };
    return Party;
}());
exports.Party = Party;

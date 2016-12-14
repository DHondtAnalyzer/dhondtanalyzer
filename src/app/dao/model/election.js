/**
 * Created by garciparedes on 16/11/2016.
 */
"use strict";
var Election = (function () {
    function Election(name, date, seats, type, districtList, partyList) {
        if (date === void 0) { date = new Date(); }
        if (seats === void 0) { seats = 0; }
        if (districtList === void 0) { districtList = []; }
        if (partyList === void 0) { partyList = []; }
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
        if (districtList === void 0) { districtList = []; }
        if (partyList === void 0) { partyList = []; }
        var election = new Election(name, date, seats, type, districtList, partyList);
        districtList.map(function (district) {
            district.election = election;
        });
        partyList.map(function (party) {
            party.electionList.push(election);
        });
        return election;
    };
    return Election;
}());
exports.Election = Election;

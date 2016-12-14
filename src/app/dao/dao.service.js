"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var DaoService = (function () {
    function DaoService(af) {
        var _this = this;
        this.af = af;
        this.af.database.list('/rest/elections').subscribe(function (elections) {
            _this._electionList = elections;
        });
        this.af.database.list('/rest/partys').subscribe(function (parties) {
            _this._partyList = parties;
        });
        this.af.database.list('/rest/regions').subscribe(function (regions) {
            _this._regionList = regions;
        });
    }
    ///////////
    // CRUD: Election
    //
    DaoService.prototype.createElection = function (id, election) {
        return this.af.database.object('/rest/elections/' + id).set(election);
    };
    DaoService.prototype.getElections = function () {
        return this._electionList;
    };
    DaoService.prototype.getElectionById = function (id) {
        for (var _i = 0, _a = this._electionList; _i < _a.length; _i++) {
            var election = _a[_i];
            if (election.id == id)
                return election;
        }
        return null;
    };
    DaoService.prototype.updateElection = function (id, election) {
        return this.af.database.object('/rest/rest/elections/' + id).update(election);
    };
    DaoService.prototype.deleteElection = function (id) {
        return this.af.database.object('/rest/elections/' + id).remove();
    };
    ///////////
    // CRUD: Party
    //
    DaoService.prototype.createParty = function (id, party) {
        return this.af.database.object('/rest/parties/' + id).set(party);
    };
    DaoService.prototype.getParties = function () {
        return this._partyList;
    };
    DaoService.prototype.getPartyById = function (id) {
        for (var _i = 0, _a = this._partyList; _i < _a.length; _i++) {
            var party = _a[_i];
            if (party.id == id)
                return party;
        }
        return null;
    };
    DaoService.prototype.updateParty = function (id, party) {
        return this.af.database.object('/rest/parties/' + id).update(party);
    };
    DaoService.prototype.deleteParty = function (id) {
        return this.af.database.object('/rest/parties/' + id).remove();
    };
    ///////////
    // CRUD: Region
    //
    DaoService.prototype.createRegion = function (id, region) {
        return this.af.database.object('/rest/regions/' + id).set(region);
    };
    DaoService.prototype.getRegions = function () {
        return this._regionList;
    };
    DaoService.prototype.getRegionById = function (id) {
        for (var _i = 0, _a = this._regionList; _i < _a.length; _i++) {
            var region = _a[_i];
            if (region.id == id)
                return region;
        }
        return null;
    };
    DaoService.prototype.updateRegion = function (id, region) {
        return this.af.database.object('/rest/regions/' + id).update(region);
    };
    DaoService.prototype.deleteRegion = function (id) {
        return this.af.database.object('/rest/regions/' + id).remove();
    };
    DaoService = __decorate([
        core_1.Injectable()
    ], DaoService);
    return DaoService;
}());
exports.DaoService = DaoService;

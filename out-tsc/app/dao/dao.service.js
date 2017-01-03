var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Election } from "./model/election";
import { Party } from "./model/party";
import { District } from "./model";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/map';
import { Region } from "./model/region";
import { AngularFire } from "angularfire2";
import { AppListObservableObject } from "./app-list-observable-object";
export var DaoService = (function () {
    function DaoService(af) {
        this.af = af;
    }
    ///////////
    // CRUD: Election
    //
    DaoService.prototype.createElection = function (election) {
        return this.getElectionListObservable().push({
            name: election.name,
            date: election.date,
            seats: election.seats,
            type: election.type,
            districtList: election.districtList.plainList(),
            partyList: election.partyList.plainList()
        });
    };
    DaoService.prototype.getElections = function () {
        var _this = this;
        if (this._electionList === undefined) {
            this._electionList = [];
            this.getElectionListObservable().subscribe(function (elections) {
                if (elections)
                    _this._electionList = elections;
                else
                    _this._electionList = [];
            });
        }
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
    DaoService.prototype.getElectionListObservable = function () {
        if (!this.electionListObs) {
            this.electionListObs = this.af.database.list('/rest/elections').map(function (list) {
                return list.map(function (item) {
                    return Election.fromRaw(item);
                });
            });
        }
        return this.electionListObs;
    };
    DaoService.prototype.getElectionRaw = function (key) {
        return this.af.database.object("/rest/elections/" + key);
    };
    DaoService.prototype.getElectionObjectObservable = function (id, deep) {
        var _this = this;
        if (deep === void 0) { deep = 1; }
        return this.getElectionRaw(id).map(function (election) {
            // TODO Refactor code to extract it in functions.
            if (deep) {
                var partyKeys = void 0;
                if (election.partyList) {
                    partyKeys = Object.keys(election.partyList);
                }
                else {
                    partyKeys = [];
                }
                election.partyList = new AppListObservableObject();
                partyKeys.map(function (key) {
                    election.partyList.push(_this.getPartyObjectObservable(key, deep - 1));
                });
                var districtKeys = void 0;
                if (election.districtList) {
                    districtKeys = Object.keys(election.districtList);
                }
                else {
                    districtKeys = [];
                }
                election.districtList = new AppListObservableObject();
                districtKeys.map(function (key) {
                    election.districtList.push(_this.getDistrictObjectObservable(key, deep));
                });
            }
            return Election.fromRaw(election);
        });
    };
    DaoService.prototype.updateElection = function (election) {
        return this.getElectionRaw(election.id).update({
            name: election.name,
            date: election.date,
            seats: election.seats,
            type: election.type,
            districtList: election.districtList.plainList(),
            partyList: election.partyList.plainList()
        });
    };
    DaoService.prototype.updateElectionRaw = function (raw) {
        var i = this.getElectionRaw(raw.$key);
        delete raw.$exists;
        delete raw.$key;
        return i.update(raw);
    };
    DaoService.prototype.deleteElection = function (election) {
        if (election.districtList.isEmpty() && election.partyList.isEmpty()) {
            return this.getElectionRaw(election.id).remove();
        }
        else {
            return new Promise(function (resolve, reject) {
                reject({
                    message: "Election participates in one or more districts or parties"
                });
            });
        }
    };
    DaoService.prototype.saveElection = function (election) {
        if (election.id) {
            return this.updateElection(election);
        }
        else {
            return this.createElection(election);
        }
    };
    DaoService.prototype.removePartyFromElection = function (electionId, partyId) {
        var _this = this;
        var s1 = this.getElectionRaw(electionId).subscribe(function (electionRaw) {
            if (electionRaw.partyList && electionRaw.partyList[partyId]) {
                delete electionRaw.partyList[partyId];
            }
            _this.updateElectionRaw(electionRaw).then(function () {
                s1.unsubscribe();
            });
        });
        var s2 = this.getPartyRaw(partyId).subscribe(function (partyRaw) {
            if (partyRaw.electionList && partyRaw.electionList[electionId]) {
                delete partyRaw.electionList[electionId];
            }
            _this.updatePartyRaw(partyRaw).then(function () {
                s2.unsubscribe();
            });
        });
    };
    DaoService.prototype.addPartyToElection = function (electionId, partyId) {
        var _this = this;
        var s1 = this.getElectionRaw(electionId).subscribe(function (electionRaw) {
            if (!electionRaw.partyList) {
                electionRaw.partyList = {};
            }
            electionRaw.partyList[partyId] = true;
            _this.updateElectionRaw(electionRaw).then(function () {
                s1.unsubscribe();
            });
        });
        var s2 = this.getPartyRaw(partyId)
            .subscribe(function (partyRaw) {
            if (!partyRaw.electionList) {
                partyRaw.electionList = {};
            }
            partyRaw.electionList[electionId] = true;
            _this.updatePartyRaw(partyRaw).then(function () {
                s2.unsubscribe();
            });
        });
    };
    DaoService.prototype.addDistrictToElection = function (electionId, regionId) {
        var _this = this;
        this.createDistrictRaw({
            election: (_a = {},
                _a[electionId] = true,
                _a
            ),
            region: (_b = {},
                _b[regionId] = true,
                _b
            )
        }).then(function (resolve) {
            var s1 = _this.af.database.object(resolve).subscribe(function (districtRaw) {
                var flag = false;
                var s2 = _this.getElectionRaw(electionId).subscribe(function (electionRaw) {
                    if (!electionRaw.districtList) {
                        electionRaw.districtList = {};
                    }
                    electionRaw.districtList[districtRaw.$key] = true;
                    _this.updateElectionRaw(electionRaw).then(function () {
                        if (flag) {
                            s1.unsubscribe();
                        }
                        else {
                            flag = true;
                        }
                        s2.unsubscribe();
                    });
                });
                var s3 = _this.getRegionRaw(regionId).subscribe(function (regionRaw) {
                    if (!regionRaw.districtList) {
                        regionRaw.districtList = {};
                    }
                    regionRaw.districtList[districtRaw.$key] = true;
                    _this.updateRegionRaw(regionRaw).then(function () {
                        if (flag) {
                            s1.unsubscribe();
                        }
                        else {
                            flag = true;
                        }
                        s3.unsubscribe();
                    });
                });
            });
        });
        var _a, _b;
    };
    ///////////
    // CRUD: Party
    //
    DaoService.prototype.createParty = function (party) {
        return this.getPartyListObservable().push({
            abbreviation: party.abbreviation,
            color: party.color,
            electionList: party.electionList.plainList(),
            name: party.name,
        });
    };
    DaoService.prototype.getParties = function () {
        var _this = this;
        if (this._partyList === undefined) {
            this._partyList = [];
            this.getPartyListObservable().subscribe(function (parties) {
                if (parties)
                    _this._partyList = parties;
                else
                    _this._partyList = [];
            });
        }
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
    DaoService.prototype.getPartyListObservable = function () {
        if (!this.partyListObs) {
            this.partyListObs = this.af.database.list('/rest/parties').map(function (list) {
                return list.map(function (party) {
                    return Party.fromRaw(party);
                });
            });
        }
        return this.partyListObs;
    };
    DaoService.prototype.getPartyRaw = function (key) {
        return this.af.database.object("/rest/parties/" + key);
    };
    DaoService.prototype.getPartyObjectObservable = function (id, deep) {
        var _this = this;
        if (deep === void 0) { deep = 1; }
        return this.getPartyRaw(id).map(function (party) {
            // TODO Refactor code to extract it in functions.
            if (deep) {
                var electionKeys = void 0;
                if (party.electionList) {
                    electionKeys = Object.keys(party.electionList);
                }
                else {
                    electionKeys = [];
                }
                party.electionList = new AppListObservableObject();
                electionKeys.map(function (key) {
                    party.electionList.push(_this.getElectionObjectObservable(key, deep - 1));
                });
            }
            return Party.fromRaw(party);
        });
    };
    DaoService.prototype.updateParty = function (party) {
        return this.updatePartyRaw({
            abbreviation: party.abbreviation,
            color: party.color,
            electionList: party.electionList.plainList(),
            $key: party.id,
            name: party.name,
        });
    };
    DaoService.prototype.updatePartyRaw = function (raw) {
        var i = this.getPartyRaw(raw.$key);
        delete raw.$exists;
        delete raw.$key;
        return i.update(raw);
    };
    DaoService.prototype.deleteParty = function (party) {
        if (party.electionList.isEmpty()) {
            return this.getPartyRaw(party.id).remove();
        }
        else {
            return new Promise(function (resolve, reject) {
                reject({
                    message: "Party participates in one or more elections"
                });
            });
        }
    };
    DaoService.prototype.saveParty = function (party) {
        if (party.id) {
            return this.updateParty(party);
        }
        else {
            return this.createParty(party);
        }
    };
    ///////////
    // CRUD: Region
    //
    DaoService.prototype.createRegion = function (region) {
        return this.getRegionListObservable().push({
            name: region.name,
            districtList: region.districtList.plainList()
        });
    };
    DaoService.prototype.getRegions = function () {
        var _this = this;
        if (this._regionList === undefined) {
            this._regionList = [];
            this.getRegionListObservable().subscribe(function (regions) {
                if (regions)
                    _this._regionList = regions;
                else
                    _this._regionList = [];
            });
        }
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
    DaoService.prototype.getRegionListObservable = function () {
        if (!this.regionListObs) {
            this.regionListObs = this.af.database.list('/rest/regions').map(function (list) {
                return list.map(function (item) {
                    return Region.fromRaw(item);
                });
            });
        }
        return this.regionListObs;
    };
    DaoService.prototype.getRegionRaw = function (key) {
        return this.af.database.object("/rest/regions/" + key);
    };
    DaoService.prototype.getRegionObjectObservable = function (id, deep) {
        var _this = this;
        if (deep === void 0) { deep = 1; }
        return this.getRegionRaw(id).map(function (region) {
            // TODO Refactor code to extract it in functions.
            if (deep) {
                var electionKeys = void 0;
                if (region.districtList) {
                    electionKeys = Object.keys(region.districtList);
                }
                else {
                    electionKeys = [];
                }
                region.districtList = new AppListObservableObject();
                electionKeys.map(function (key) {
                    region.districtList.push(_this.getDistrictObjectObservable(key, deep));
                });
            }
            return Region.fromRaw(region);
        });
    };
    DaoService.prototype.updateRegion = function (region) {
        return this.updateRegionRaw({
            name: region.name,
            districtList: region.districtList.plainList()
        });
    };
    DaoService.prototype.updateRegionRaw = function (raw) {
        var i = this.getRegionRaw(raw.$key);
        delete raw.$exists;
        delete raw.$key;
        return i.update(raw);
    };
    DaoService.prototype.deleteRegion = function (region) {
        if (region.districtList.isEmpty()) {
            return this.getRegionRaw(region.id).remove();
        }
        else {
            return new Promise(function (resolve, reject) {
                reject({
                    message: "Region participates in one or more districts"
                });
            });
        }
    };
    DaoService.prototype.saveRegion = function (region) {
        if (region.id) {
            return this.updateRegion(region);
        }
        else {
            return this.createRegion(region);
        }
    };
    ///////////
    // CRUD: District
    //
    DaoService.prototype.createDistrict = function (district) {
        return this.createDistrictRaw({
            seats: district.seats,
            census: district.census,
            election: district.election,
            region: district.region
        });
    };
    DaoService.prototype.createDistrictRaw = function (raw) {
        return this.getDistrictListObservable().push(raw);
    };
    DaoService.prototype.getDistricts = function () {
        var _this = this;
        if (this._districtList === undefined) {
            this._districtList = [];
            this.getDistrictListObservable().subscribe(function (districts) {
                if (districts)
                    _this._districtList = districts;
                else
                    _this._districtList = [];
            });
        }
        return this._districtList;
    };
    DaoService.prototype.getDistrictById = function (id) {
        for (var _i = 0, _a = this._districtList; _i < _a.length; _i++) {
            var district = _a[_i];
            if (district.id == id)
                return district;
        }
        return null;
    };
    DaoService.prototype.getDistrictListObservable = function () {
        if (!this.districtListObs) {
            this.districtListObs = this.af.database.list('/rest/districts');
        }
        return this.districtListObs;
    };
    DaoService.prototype.getDistrictRaw = function (key) {
        return this.af.database.object("/rest/districts/" + key);
    };
    DaoService.prototype.getDistrictObjectObservable = function (id, deep) {
        var _this = this;
        if (deep === void 0) { deep = 1; }
        return this.getDistrictRaw(id).map(function (districtRaw) {
            // TODO Refactor code to extract it in functions.
            if (deep) {
                var electionKeys = void 0;
                if (districtRaw.election) {
                    electionKeys = Object.keys(districtRaw.election);
                }
                else {
                    electionKeys = [];
                }
                districtRaw.election = _this.getElectionObjectObservable(electionKeys[0], deep - 1);
                var regionKeys = void 0;
                if (districtRaw.region) {
                    regionKeys = Object.keys(districtRaw.region);
                }
                else {
                    regionKeys = [];
                }
                districtRaw.region = _this.getRegionObjectObservable(regionKeys[0], deep - 1);
            }
            return District.fromRaw(districtRaw);
        });
    };
    DaoService.prototype.updateDistrict = function (district) {
        return this.updateDistrictRaw({
            $key: district.id,
            seats: district.seats,
            census: district.census,
        });
    };
    DaoService.prototype.updateDistrictRaw = function (raw) {
        var i = this.getDistrictRaw(raw.$key);
        delete raw.$exists;
        delete raw.$key;
        return i.update(raw);
    };
    DaoService.prototype.deleteDistrict = function (districtId) {
        var _this = this;
        var i = this.getDistrictRaw(districtId).subscribe(function (district) {
            var electionId = Object.keys(district.election)[0];
            var regionId = Object.keys(district.region)[0];
            var flag = false;
            var s1 = _this.getElectionRaw(electionId).subscribe(function (electionRaw) {
                if (electionRaw.districtList && electionRaw.districtList[districtId]) {
                    delete electionRaw.districtList[districtId];
                }
                _this.updateElectionRaw(electionRaw).then(function () {
                    if (flag) {
                        i.unsubscribe();
                        _this.getDistrictRaw(districtId).remove();
                    }
                    else {
                        flag = true;
                    }
                    s1.unsubscribe();
                });
            });
            var s2 = _this.getRegionRaw(regionId).subscribe(function (regionRaw) {
                if (regionRaw.districtList && regionRaw.districtList[districtId]) {
                    delete regionRaw.districtList[districtId];
                }
                _this.updateRegionRaw(regionRaw).then(function () {
                    if (flag) {
                        i.unsubscribe();
                        _this.getDistrictRaw(districtId).remove();
                    }
                    else {
                        flag = true;
                    }
                    s2.unsubscribe();
                });
            });
        });
    };
    DaoService.prototype.saveDistrict = function (district) {
        if (district.id) {
            return this.updateDistrict(district);
        }
        else {
            return this.createDistrict(district);
        }
    };
    DaoService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [AngularFire])
    ], DaoService);
    return DaoService;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/dao.service.js.map
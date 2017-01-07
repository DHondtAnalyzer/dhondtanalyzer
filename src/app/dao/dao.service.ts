import {Election, ElectionRaw} from "./model/election";
import {Party, PartyRaw} from "./model/party";
import {District} from "./model";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/map';
import {Region, RegionRaw} from "./model/region";
import {AngularFire} from "angularfire2";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {Subscription} from "rxjs";
import {DistrictRaw} from "./model/district";
import {VoteCount, VoteCountRaw} from "./model/vote-count";
import {VoteType} from "./model/vote-type";
import {DaoDistrict} from "./dao-district";
import {DaoElection} from "./dao-election";
import {DaoParty} from "./dao-party";
import {DaoRegion} from "./dao-region";
import {DaoVoteCount} from "./dao-vote-count";

@Injectable()
export class DaoService {

  private _electionList: Election[];
  private _partyList: Party[];
  private _regionList: Region[];
  private _districtList: District[];
  private _voteCountList: VoteCount[];

  private daoDistrict: DaoDistrict;
  private daoElection: DaoElection;
  private daoParty: DaoParty;
  private daoRegion: DaoRegion;
  private daoVoteCount: DaoVoteCount;

  constructor(private af: AngularFire) {
    this.daoDistrict = DaoDistrict.newInstance(af);
    this.daoElection = DaoElection.newInstance(af);
    this.daoParty = DaoParty.newInstance(af);
    this.daoRegion = DaoRegion.newInstance(af);
    this.daoVoteCount = DaoVoteCount.newInstance(af);
  }


  ///////////
  // CRUD: Election
  //


  getElections(): Election[] {

    if (this._electionList === undefined) {
      this._electionList = [];
      this.getElectionListObservable().subscribe(elections => {
        if (elections)
          this._electionList = elections;
        else
          this._electionList = [];
      });
    }
    return this._electionList;
  }

  getElectionById(id: string): Election {
    for (let election of this._electionList)
      if (election.id == id)
        return election;
    return null;
  }


  getElectionListObservable(): AppListObservable<Election[]> {
    return this.daoElection.getElectionListObservable();
  }

  getElectionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Election> {
    return this.daoElection.getElectionObjectObservable(id, deep);
  }

  deleteElection(election: Election): AppPromise<void> {
    return this.daoElection.deleteElection(election);
  }

  saveElection(election: Election): AppPromise<void> {
    return this.daoElection.saveElection(election);
  }

  removePartyFromElection(electionId: string, partyId: string) {
    return this.daoElection.removePartyFromElection(electionId, partyId);
  }

  addPartyToElection(electionId: string, partyId: string) {
    return this.daoElection.addPartyToElection(electionId, partyId);
  }

  addDistrictToElection(electionId: string, regionId: string) {
    return this.daoDistrict.addDistrictToElection(electionId, regionId)
  }


  ///////////
  // CRUD: Party
  //

  getParties(): Party[] {
    if (this._partyList === undefined) {
      this._partyList = [];
      this.getPartyListObservable().subscribe(parties => {
        if (parties)
          this._partyList = parties;
        else
          this._partyList = [];
      });
    }
    return this._partyList;
  }

  getPartyById(id: string): Party {
    for (let party of this._partyList)
      if (party.id == id)
        return party;
    return null;
  }

  getPartyListObservable(): AppListObservable<Party[]> {
    return this.daoParty.getPartyListObservable();
  }

  getPartyObjectObservable(id: string, deep: number = 1): AppObjectObservable<Party> {
    return this.daoParty.getPartyObjectObservable(id, deep);
  }

  deleteParty(party: Party): AppPromise<void> {
    return this.daoParty.deleteParty(party);
  }

  saveParty(party: Party): AppPromise<void> {
    return this.daoParty.saveParty(party);
  }


  ///////////
  // CRUD: Region
  //

  getRegions(): Region[] {
    if (this._regionList === undefined) {
      this._regionList = [];
      this.getRegionListObservable().subscribe(regions => {
        if (regions)
          this._regionList = regions;
        else
          this._regionList = [];
      });
    }
    return this._regionList;
  }

  getRegionById(id: string): Region {
    for (let region of this._regionList)
      if (region.id == id)
        return region;
    return null;
  }

  getRegionListObservable(): AppListObservable<Region[]> {
    return this.daoRegion.getRegionListObservable();
  }

  getRegionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Region> {
    return this.daoRegion.getRegionObjectObservable(id, deep);
  }

  deleteRegion(region: Region): AppPromise<void> {
    return this.daoRegion.deleteRegion(region);
  }

  saveRegion(region: Region): AppPromise<void> {
    return this.daoRegion.saveRegion(region)
  }


  ///////////
  // CRUD: District
  //


  getDistricts(): District[] {
    if (this._districtList === undefined) {
      this._districtList = [];
      this.getDistrictListObservable().subscribe(districts => {
        if (districts)
          this._districtList = districts;
        else
          this._districtList = [];
      });
    }
    return this._districtList;
  }

  getDistrictById(id: string): District {
    for (let district of this._districtList)
      if (district.id == id)
        return district;
    return null;
  }

  getDistrictListObservable(): AppListObservable<District[]> {
    return this.daoDistrict.getDistrictListObservable();
  }

  getDistrictObjectObservable(id: string, deep: number = 1): AppObjectObservable<District> {
    return this.daoDistrict.getDistrictObjectObservable(id, deep);
  }

  deleteDistrict(districtId: string) {
    return this.daoDistrict.deleteDistrict(districtId);
  }

  saveDistrict(district: District): AppPromise<void> {
    return this.daoDistrict.saveDistrict(district);
  }


  ///////////
  // CRUD: Vote Count
  //

  getVoteCountListObservable(): AppListObservable<VoteCount[]> {
    return this.daoVoteCount.getVoteCountListObservable();
  }


  getVoteCountObjectObservable(id: string, deep: number = 1): AppObjectObservable<VoteCount> {
    return this.daoVoteCount.getVoteCountObjectObservable(id, deep);
  }

  saveVoteCount(voteCount: VoteCount): AppPromise<void> {
    return this.daoVoteCount.saveVoteCount(voteCount);
  }
}

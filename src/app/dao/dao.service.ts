import {Election} from "./model/election";
import {Party} from "./model/party";
import {District} from "./model";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Region} from "./model/region";
import {AngularFire} from "angularfire2";
import {AppListObservable} from "./app-list-observable";
import {AppObjectObservable} from "./model/app-object-observable";

@Injectable()
export class DaoService {

  private _electionList: Election[];
  private _partyList: Party[];
  private _regionList: Region[];
  private _districtList: District[];

  constructor(private af: AngularFire) {
  }

  ///////////
  // CRUD: Election
  //

  createElection(id: string, election: Election): firebase.Promise<void> {
    return this.af.database.object('/rest/elections/' + id).set(election);
  }

  getElections(): Election[] {

    if (this._electionList === undefined) {
      this._electionList = [];
      this.getElectionListObservable().subscribe(elections => {
        if(elections)
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
    return this.af.database.list('/rest/elections');
  }

  getElectionObjectObservable(id: string): AppObjectObservable<Election> {
    return this.af.database.object(`/rest/elections/${id}`);
  }

  updateElection(id: string, election: Election): firebase.Promise<void> {
    return this.getElectionObjectObservable(id).update(election);
  }

  deleteElection(id: string): firebase.Promise<void> {
    return this.getElectionObjectObservable(id).remove();
  }

  ///////////
  // CRUD: Party
  //

  createParty(id: string, party: Party): firebase.Promise<void> {
    return this.af.database.object('/rest/parties/' + id).set(party);
  }

  getParties(): Party[] {
    if (this._partyList === undefined) {
      this._partyList = [];
      this.getPartyListObservable().subscribe(parties => {
        if(parties)
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
    return this.af.database.list('/rest/parties');
  }

  getPartyObjectObservable(id: string): AppObjectObservable<Party> {
    return this.af.database.object(`/rest/parties/${id}`);
  }

  updateParty(id: string, party: Party): firebase.Promise<void> {
    return this.getPartyObjectObservable(id).update(party);
  }

  deleteParty(id: string): firebase.Promise<void> {
    return this.getPartyObjectObservable(id).remove();
  }

  ///////////
  // CRUD: Region
  //

  createRegion(id: string, region: Region): firebase.Promise<void> {
    return this.af.database.object('/rest/regions/' + id).set(region);
  }

  getRegions(): Region[] {
    if (this._regionList === undefined) {
      this._regionList = [];
      this.getRegionListObservable().subscribe(regions => {
        if(regions)
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
    return this.af.database.list('/rest/regions');
  }

  getRegionObjectObservable(id: string): AppObjectObservable<Region> {
    return this.af.database.object(`/rest/regions/${id}`);
  }

  updateRegion(id: string, region: Region): firebase.Promise<void> {
    return this.getRegionObjectObservable(id).update(region);
  }

  deleteRegion(id: string): firebase.Promise<void> {
    return this.getRegionObjectObservable(id).remove();
  }


  ///////////
  // CRUD: District
  //

  createDistrict(id: string, district: District): firebase.Promise<void> {
    return this.af.database.object('/rest/districts/' + id).set(district);
  }

  getDistricts(): District[] {
    if (this._districtList === undefined) {
      this._districtList = [];
      this.getDistrictListObservable().subscribe(districts => {
        if(districts)
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
    return this.af.database.list('/rest/districts');
  }

  getDistrictObjectObservable(id: string): AppObjectObservable<District> {
    return this.af.database.object(`/rest/districts/${id}`);
  }

  updateDistrict(id: string, district: District): firebase.Promise<void> {
    return this.getDistrictObjectObservable(id).update(district);
  }

  deleteDistrict(id: string): firebase.Promise<void> {
    return this.getDistrictObjectObservable(id).remove();
  }
}

import {Election} from "./model/election";
import {Party, PartyRaw} from "./model/party";
import {District} from "./model";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/map';
import {Region, RegionRaw} from "./model/region";
import {AngularFire} from "angularfire2";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {AppList} from "./app-list";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";

@Injectable()
export class DaoService {

  private _electionList: Election[];
  private _partyList: Party[];
  private _regionList: Region[];
  private _districtList: District[];


  private electionListObs: AppListObservable<Election[]>;
  private partyListObs: AppListObservable<Party[]>;
  private regionListObs: AppListObservable<Region[]>;
  private districtListObs: AppListObservable<District[]>;

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

  getElectionListObservable(): AppList<Election> {
    if (!this.electionListObs) {
      this.electionListObs = this.af.database.list('/rest/elections')
    }
    return this.electionListObs;
  }

  getElectionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Election> {

    return <AppObjectObservable<Election>>this.af.database.object(`/rest/elections/${id}`).map((election: Election) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        let partyKeys: string[];
        if (election.partyList) {
          partyKeys = Object.keys(election.partyList);
        } else {
          partyKeys = [];
        }

        election.partyList = new AppListObservableObject<Party>();
        partyKeys.map(key => {
          election.partyList.push(this.getPartyObjectObservable(key, deep - 1));
        });


        let districtKeys: string[];
        if (election.districtList) {
          districtKeys = Object.keys(election.districtList);
        } else {
          districtKeys = [];
        }

        election.districtList = new AppListObservableObject<District>();
        districtKeys.map(key => {
          election.districtList.push(this.getDistrictObjectObservable(key, deep));
        });
      }

      return election;
    });
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

  createParty(party: Party): AppPromise<void> {
    return this.getPartyListObservable().push({
      abbreviation: party.abbreviation,
      color: party.color,
      electionList: party.electionList.plainList(),
      name: party.name,
    });
  }

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

    if (!this.partyListObs) {
      this.partyListObs = <AppListObservable<Party[]>>
        this.af.database.list('/rest/parties').map((list: PartyRaw[]) => {
          return list.map<Party>((party: PartyRaw) => {
            return Party.fromRaw(party);
          })
        });
    }
    return this.partyListObs;
  }

  getPartyObjectObservable(id: string, deep: number = 1): AppObjectObservable<Party> {

    return <AppObjectObservable<Party>> this.af.database.object(`/rest/parties/${id}`).map((party: PartyRaw) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        let electionKeys: string[];
        if (party.electionList) {
          electionKeys = Object.keys(party.electionList);
        } else {
          electionKeys = [];
        }

        party.electionList = new AppListObservableObject<Election>();
        electionKeys.map(key => {
          party.electionList.push(this.getElectionObjectObservable(key, deep - 1));
        });
      }

      return Party.fromRaw(party);
    });
  }

  updateParty(party: Party):  AppPromise<void> {
    return this.getPartyObjectObservable(party.id).update(
      {
        abbreviation: party.abbreviation,
        color: party.color,
        electionList: party.electionList.plainList(),
        id: party.id,
        name: party.name,
      }
    );
  }

  deleteParty(party: Party): AppPromise<void> {
    if (party.electionList.isEmpty()) {
      return this.getPartyObjectObservable(party.id).remove();
    } else {
      return new Promise((resolve, reject) => {
        reject({
          message: "Party participates in one or more elections"
        });
      });
    }
  }

  saveParty(party: Party): AppPromise<void> {
    if (party.id) {
      return this.updateParty(party);
    } else {
      return this.createParty(party);
    }
  }

  ///////////
  // CRUD: Region
  //

  createRegion(region: Region): AppPromise<void> {
    return this.getRegionListObservable().push({
      name: region.name,
      districtList: region.districtList.plainList()
    });
  }

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
    if (!this.regionListObs) {
      this.regionListObs = <AppListObservable<Region[]>>
        this.af.database.list('/rest/regions').map((list: RegionRaw[]) => {
          return list.map<Region>((item: RegionRaw) => {
            return Region.fromRaw(item);
          })
        });
    }
    return this.regionListObs;
  }

  getRegionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Region> {
    return <AppObjectObservable<Region>>this.af.database.object(`/rest/regions/${id}`).map((region: RegionRaw) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        let electionKeys: string[];
        if (region.districtList) {
          electionKeys = Object.keys(region.districtList);
        } else {
          electionKeys = [];
        }

        region.districtList = new AppListObservableObject<District>();
        electionKeys.map(key => {
          region.districtList.push(this.getDistrictObjectObservable(key, deep));
        });

      }

      return Region.fromRaw(region);
    });
  }

  updateRegion(region: Region):  AppPromise<void> {
    return this.getRegionObjectObservable(region.id).update(
      {
        name: region.name,
        districtList: region.districtList.plainList()
      }
    );
  }

  deleteRegion(region: Region): AppPromise<void> {
    if (region.districtList.isEmpty()) {
      return this.getRegionObjectObservable(region.id).remove();
    } else {
      return new Promise((resolve, reject) => {
        reject({
          message: "Party participates in one or more elections"
        });
      });
    }
  }

  saveRegion(region: Region): AppPromise<void> {
    if (region.id) {
      return this.updateRegion(region);
    } else {
      return this.createRegion(region);
    }
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

  getDistrictListObservable(): AppList<District> {

    if (!this.districtListObs) {
      this.districtListObs = this.af.database.list('/rest/districts');
    }
    return this.districtListObs;
  }

  getDistrictObjectObservable(id: string, deep: number = 1): AppObjectObservable<District> {
    //return this.af.database.object(`/rest/districts/${id}`);

    return <AppObjectObservable<District>>this.af.database.object(`/rest/districts/${id}`).map((district: District) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        let electionKeys: string[];
        if (district.election) {
          electionKeys = Object.keys(district.election);
        } else {
          electionKeys = [];
        }
        district.election = this.getElectionObjectObservable(electionKeys[0], deep - 1);


        let regionKeys: string[];
        if (district.region) {
          regionKeys = Object.keys(district.region);
        } else {
          regionKeys = [];
        }
        district.region = this.getRegionObjectObservable(regionKeys[0], deep - 1);
      }

      return district;
    });
  }

  updateDistrict(id: string, district: District): firebase.Promise<void> {
    return this.getDistrictObjectObservable(id).update(district);
  }

  deleteDistrict(id: string): firebase.Promise<void> {
    return this.getDistrictObjectObservable(id).remove();
  }
}

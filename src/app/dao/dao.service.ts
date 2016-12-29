import {Election} from "./model/election";
import {Party} from "./model/party";
import {District} from "./model";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/map';
import {Region} from "./model/region";
import {AngularFire} from "angularfire2";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {AppList} from "./app-list";

@Injectable()
export class DaoService {

  private _electionList: Election[];
  private _partyList: Party[];
  private _regionList: Region[];
  private _districtList: District[];


  private electionListObs: AppList<Election>;
  private partyListObs: AppList<Party>;
  private regionListObs: AppList<Region>;
  private districtListObs: AppList<District>;

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

  createParty(id: string, party: Party): firebase.Promise<void> {
    return this.af.database.object('/rest/parties/' + id).set(party);
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

  getPartyListObservable(): AppList<Party> {

    if (!this.partyListObs) {
      this.partyListObs = this.af.database.list('/rest/parties');
    }
    return this.partyListObs;
  }

  getPartyObjectObservable(id: string, deep: number = 1): AppObjectObservable<Party> {

    return <AppObjectObservable<Party>>this.af.database.object(`/rest/parties/${id}`).map((party: Party) => {

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

      return party;
    });
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

  getRegionListObservable(): AppList<Region> {
    if (!this.regionListObs) {
      this.regionListObs = this.af.database.list('/rest/regions');
    }
    return this.regionListObs;
  }

  getRegionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Region> {
    return <AppObjectObservable<Region>>this.af.database.object(`/rest/regions/${id}`).map((region: Region) => {

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

      return region;
    });
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

import {Election} from "./model/election";
import {Party} from "./model/party";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
import {Region} from "./model/region";
import {AngularFire} from "angularfire2";

@Injectable()
export class DaoService {

  private _electionList: Election[];
  private _partyList: Party[];
  private _regionList: Region[];

  constructor(private af: AngularFire) {
    this.af.database.list('/rest/elections').subscribe(elections => {
      this._electionList = elections;
    });
    this.af.database.list('/rest/partys').subscribe(parties => {
      this._partyList = parties;
    });
    this.af.database.list('/rest/regions').subscribe(regions => {
      this._regionList = regions;
    });
  }

  ///////////
  // CRUD: Election
  //

  createElection(id: string, election: Election): firebase.Promise<void> {
    return this.af.database.object('/rest/elections/' + id).set(election);
  }

  getElections(): Election[] {
    return this._electionList;
  }

  getElectionById(id: string): Election {
    for(let election of this._electionList)
      if(election.id == id)
        return election;
    return null;
  }

  updateElection(id: string, election: Election): firebase.Promise<void> {
    return this.af.database.object('/rest/rest/elections/' + id).update(election);
  }

  deleteElection(id: string): firebase.Promise<void> {
    return this.af.database.object('/rest/elections/' + id).remove();
  }

  ///////////
  // CRUD: Party
  //

  createParty(id: string, party: Party): firebase.Promise<void> {
    return this.af.database.object('/rest/parties/' + id).set(party);
  }

  getParties(): Party[] {
    return this._partyList;
  }

  getPartyById(id: string): Party {
    for(let party of this._partyList)
      if(party.id == id)
        return party;
    return null;
  }

  updateParty(id: string, party: Party): firebase.Promise<void> {
    return this.af.database.object('/rest/parties/' + id).update(party);
  }

  deleteParty(id: string): firebase.Promise<void> {
    return this.af.database.object('/rest/parties/' + id).remove();
  }

  ///////////
  // CRUD: Region
  //

  createRegion(id: string, region: Region): firebase.Promise<void> {
    return this.af.database.object('/rest/regions/' + id).set(region);
  }

  getRegions(): Region[] {
    return this._regionList;
  }

  getRegionById(id: string): Region {
    for(let region of this._regionList)
      if(region.id == id)
        return region;
    return null;
  }

  updateRegion(id: string, region: Region): firebase.Promise<void> {
    return this.af.database.object('/rest/regions/' + id).update(region);
  }

  deleteRegion(id: string): firebase.Promise<void> {
    return this.af.database.object('/rest/regions/' + id).remove();
  }
}

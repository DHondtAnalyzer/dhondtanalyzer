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
import {AppList} from "./app-list";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {Subscription} from "rxjs";
import {DistrictRaw} from "./model/district";

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

  private createElection(election: Election): AppPromise<void> {
    return this.getElectionListObservable().push({
      name: election.name,
      date: election.date,
      seats: election.seats,
      type: election.type,
      districtList: election.districtList.plainList(),
      partyList: election.partyList.plainList()
    });
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


  getElectionListObservable(): AppListObservable<Election[]> {
    if (!this.electionListObs) {
      this.electionListObs = <AppListObservable<Election[]>>
        this.af.database.list('/rest/elections').map((list: ElectionRaw[]) => {
          return list.map<Election>((item: ElectionRaw) => {
            return Election.fromRaw(item);
          })
        });
    }
    return this.electionListObs;
  }


  private getElectionRaw(key: string): AppObjectObservable<ElectionRaw>{
    return this.af.database.object(`/rest/elections/${key}`);
  }


  getElectionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Election> {
    return <AppObjectObservable<Election>>this.getElectionRaw(id).map((election: ElectionRaw) => {

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

      return Election.fromRaw(election);
    });
  }



  private updateElection(election: Election):  AppPromise<void> {
    return this.getElectionRaw(election.id).update({
        name: election.name,
        date: election.date,
        seats: election.seats,
        type: election.type,
        districtList: election.districtList.plainList(),
        partyList: election.partyList.plainList()
    });
  }


  private updateElectionRaw(raw: ElectionRaw):  AppPromise<void> {
    let i = this.getElectionRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }


  deleteElection(election: Election): AppPromise<void> {
    if (election.districtList.isEmpty() && election.partyList.isEmpty()) {
      return this.getElectionRaw(election.id).remove();
    } else {
      return new Promise((resolve, reject) => {
        reject({
          message: "Election participates in one or more districts or parties"
        });
      });
    }
  }



  saveElection(election: Election): AppPromise<void> {
    if (election.id) {
      return this.updateElection(election);
    } else {
      return this.createElection(election);
    }
  }


  removePartyFromElection(electionId: string, partyId: string) {
    let s1: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {

        if(electionRaw.partyList && electionRaw.partyList[partyId]){
          delete electionRaw.partyList[partyId];
        }

        this.updateElectionRaw(electionRaw).then(() => {
          s1.unsubscribe();
        })
      });

    let s2: Subscription = this.af.database.object(`/rest/parties/${partyId}`)
      .subscribe((partyRaw: PartyRaw) => {

        if(partyRaw.electionList && partyRaw.electionList[electionId]){
          delete partyRaw.electionList[electionId];
        }

        this.updatePartyRaw(partyRaw).then(() => {
          s2.unsubscribe();
        })
      });
  }



  addPartyToElection(electionId: string, partyId: string) {
    let s1: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {

        if (!electionRaw.partyList) {
          electionRaw.partyList = {}
        }
        electionRaw.partyList[partyId] = true;
        this.updateElectionRaw(electionRaw).then(() => {
          s1.unsubscribe();
        })
      });

    let s2: Subscription = this.getPartyRaw(partyId)
      .subscribe((partyRaw: PartyRaw) => {

        if (!partyRaw.electionList) {
          partyRaw.electionList = {}
        }
        partyRaw.electionList[electionId] = true;
        this.updatePartyRaw(partyRaw).then(() => {
          s2.unsubscribe();
        })
      });
  }




  ///////////
  // CRUD: Party
  //

  private createParty(party: Party): AppPromise<void> {
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


  private getPartyRaw(key: string): AppObjectObservable<PartyRaw>{
    return this.af.database.object(`/rest/parties/${key}`);
  }



  getPartyObjectObservable(id: string, deep: number = 1): AppObjectObservable<Party> {

    return <AppObjectObservable<Party>> this.getPartyRaw(id).map((party: PartyRaw) => {

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



  private updateParty(party: Party):  AppPromise<void> {
    return this.updatePartyRaw(<PartyRaw>
      {
        abbreviation: party.abbreviation,
        color: party.color,
        electionList: party.electionList.plainList(),
        $key: party.id,
        name: party.name,
      }
    );
  }


  private updatePartyRaw(raw: PartyRaw):  AppPromise<void> {
    let i = this.getPartyRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }



  deleteParty(party: Party): AppPromise<void> {
    if (party.electionList.isEmpty()) {
      return this.getPartyRaw(party.id).remove();
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
          message: "Region participates in one or more districts"
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


  private createDistrict(district: District): AppPromise<void> {
    return this.getDistrictListObservable().push({
      seats: district.seats,
      census: district.census,
      election: district.election,
      region: district.region
    });
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


  getDistrictListObservable(): AppListObservable<District[]> {

    if (!this.districtListObs) {
      this.districtListObs = this.af.database.list('/rest/districts');
    }
    return this.districtListObs;
  }


  private getDistrictRaw(key: string): AppObjectObservable<DistrictRaw>{
    return this.af.database.object(`/rest/districts/${key}`);
  }


  getDistrictObjectObservable(id: string, deep: number = 1): AppObjectObservable<District> {
    return <AppObjectObservable<District>>this.getDistrictRaw(id).map((districtRaw: DistrictRaw) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        let electionKeys: string[];
        if (districtRaw.election) {
          electionKeys = Object.keys(districtRaw.election);
        } else {
          electionKeys = [];
        }
        districtRaw.election = this.getElectionObjectObservable(electionKeys[0], deep - 1);


        let regionKeys: string[];
        if (districtRaw.region) {
          regionKeys = Object.keys(districtRaw.region);
        } else {
          regionKeys = [];
        }
        districtRaw.region = this.getRegionObjectObservable(regionKeys[0], deep - 1);
      }

      return District.fromRaw(districtRaw);
    });
  }


  private updateDistrict(district: District):  AppPromise<void> {
    return this.updateDistrictRaw(<DistrictRaw>
      {
        seats: district.seats,
        census: district.census,
        election: district.election,
        region: district.region
      }
    );
  }


  private updateDistrictRaw(raw: DistrictRaw):  AppPromise<void> {
    let i = this.getPartyRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }


  deleteDistrict(district: District): AppPromise<void> {
    return this.getDistrictRaw(district.id).remove();
  }


  saveDistrict(district: District): AppPromise<void> {
    if (district.id) {
      return this.updateDistrict(district);
    } else {
      return this.createDistrict(district);
    }
  }
}

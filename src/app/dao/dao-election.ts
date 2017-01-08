import {Election, ElectionRaw} from "./model/election";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {Party, PartyRaw} from "./model/party";
import {District, DistrictRaw} from "./model/district";
import {Subscription} from "rxjs";
import {RegionRaw} from "./model/region";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {DaoRegion} from "./dao-region";
import {DaoDistrict} from "./dao-district";
import {DaoParty} from "./dao-party";
import {DaoVoteCount} from "./dao-vote-count";
/**
 * Created by garciparedes on 07/01/2017.
 */

export class DaoElection {

  private af: AngularFire;
  private database: AngularFireDatabase;

  private electionListObs: AppListObservable<Election[]>;

  private list_url: string;

  private static instance: DaoElection;

  static newInstance(af?: AngularFire): DaoElection {
    if (!DaoElection.instance) {
      DaoElection.instance = new DaoElection(af);
    }
    return DaoElection.instance;
  }

  constructor(af: AngularFire) {
    this.list_url = '/rest/elections/';
    this.af = af;
    this.database = af.database;
  }


  private getDaoRegion(): DaoRegion {
    return DaoRegion.newInstance();
  }

  private getDaoDistrict(): DaoDistrict {
    return DaoDistrict.newInstance();
  }


  private getDaoParty(): DaoParty {
    return DaoParty.newInstance();
  }

  private getDaoVoteCount(): DaoVoteCount {
    return DaoVoteCount.newInstance();
  }


  private updateRegionRaw(regionRaw: RegionRaw) {
    return this.getDaoRegion().updateRegionRaw(regionRaw);
  }

  private getRegionRaw(regionId: string) {
    return this.getDaoRegion().getRegionRaw(regionId);
  }


  private getDistrictObjectObservable(key: string, deep: number) {
    return this.getDaoDistrict().getDistrictObjectObservable(key, deep);
  }

  private getPartyObjectObservable(key: string, number: number) {
    return this.getDaoParty().getPartyObjectObservable(key, number);
  }


  private getPartyRaw(partyId: string) {
    return this.getDaoParty().getPartyRaw(partyId);
  }

  private updatePartyRaw(partyRaw: PartyRaw) {
    return this.getDaoParty().updatePartyRaw(partyRaw);
  }


  private addVoteCountToDistrict(key: string, partyId: string) {
    return this.getDaoVoteCount().addVoteCountToDistrict(key, partyId);
  }


  ///////////
  // CRUD: Election
  //

  private getListURL(): string {
    return this.list_url;
  }

  private getObjectURL(key: string): string {
    return `${this.getListURL()}${key}`;
  }

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


  getElectionListObservable(): AppListObservable<Election[]> {
    if (!this.electionListObs) {
      this.electionListObs = <AppListObservable<Election[]>>
        this.database.list('/rest/elections').map((list: ElectionRaw[]) => {
          return list.map<Election>((item: ElectionRaw) => {
            return Election.fromRaw(item);
          })
        });
    }
    return this.electionListObs;
  }


  getElectionRaw(key: string): AppObjectObservable<ElectionRaw> {
    return <AppObjectObservable<ElectionRaw>>this.database.object(`/rest/elections/${key}`);
  }


  getElectionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Election> {
    return <AppObjectObservable<Election>>this.getElectionRaw(id).map((election: ElectionRaw) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        if (election.partyList) {
          let keyList: string[] = Object.keys(election.partyList);

          election.partyList = new AppListObservableObject<Party>();

          keyList.forEach(key => {
            election.partyList.push(this.getPartyObjectObservable(key, deep - 1));
          });

        } else {
          election.partyList = new AppListObservableObject<Party>();
        }


        if (election.districtList) {

          let keyList: string[] = Object.keys(election.districtList);
          election.districtList = new AppListObservableObject<District>();

          keyList.forEach(key => {
            election.districtList.push(this.getDistrictObjectObservable(key, deep));
          });
        } else {
          election.districtList = new AppListObservableObject<District>();
        }
      }

      return Election.fromRaw(election);
    });
  }


  private updateElection(election: Election): AppPromise<void> {
    return this.updateElectionRaw(<ElectionRaw>{
      name: election.name,
      date: election.date,
      seats: election.seats,
      type: election.type,
      districtList: election.districtList.plainList(),
      partyList: election.partyList.plainList()
    });
  }


  updateElectionRaw(raw: ElectionRaw): AppPromise<void> {
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
    let f1: boolean = false;
    let s1: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {
      if (f1) {
        if (s1){
          s1.unsubscribe();
        }
      } else {
        f1 = true;
        if (electionRaw.partyList && electionRaw.partyList[partyId]) {
          delete electionRaw.partyList[partyId];
        }
        this.updateElectionRaw(electionRaw);
      }
    });

    let f2: boolean = false;
    let s2: Subscription = this.getPartyRaw(partyId).subscribe((partyRaw: PartyRaw) => {
      if (f2) {
        if (s2){
          s2.unsubscribe();
        }
      } else {
        f2 = true;
        if (partyRaw.electionList && partyRaw.electionList[electionId]) {
          delete partyRaw.electionList[electionId];
        }
        this.updatePartyRaw(partyRaw);
      }
    });
  }


  addPartyToElection(electionId: string, partyId: string) {
    let f1: boolean = false;
    let s1: Subscription = this.getElectionRaw(electionId)
      .subscribe((electionRaw: ElectionRaw) => {
        if (f1) {
          if (s1){
            s1.unsubscribe();
          }
        } else {
          f1 = true;
          if (!electionRaw.partyList) {
            electionRaw.partyList = {}
          }
          electionRaw.partyList[partyId] = true;
          if (electionRaw.districtList) {
            Object.keys(electionRaw.districtList).forEach(key => {
              this.addVoteCountToDistrict(key, partyId);
            });
          }
          this.updateElectionRaw(electionRaw);
        }
      });

    let f2: boolean = false;
    let s2: Subscription = this.getPartyRaw(partyId)
      .subscribe((partyRaw: PartyRaw) => {
        if (f2) {
          if (s2){
            s2.unsubscribe();
          }
        } else {
          f2 = true;
          if (!partyRaw.electionList) {
            partyRaw.electionList = {}
          }
          partyRaw.electionList[electionId] = true;
          this.updatePartyRaw(partyRaw);
        }
      });
  }
}


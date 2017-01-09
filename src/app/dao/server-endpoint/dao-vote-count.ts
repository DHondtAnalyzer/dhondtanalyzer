import {Election, ElectionRaw} from "../model/election";
import {AppListObservable} from "../shared/app-list-observable";
import {AppPromise} from "../shared/app-promise";
import {AppObjectObservable} from "../shared/app-object-observable";
import {AppListObservableObject} from "../shared/app-list-observable-object";
import {DistrictRaw} from "../model/district";
import {Subscription} from "rxjs";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {VoteCount, VoteCountRaw} from "../model/vote-count";
import {VoteType} from "../model/vote-type";
import {DaoRegion} from "./dao-region";
import {DaoDistrict} from "./dao-district";
import {DaoElection} from "./dao-election";
/**
 * Created by garciparedes on 07/01/2017.
 */

export class DaoVoteCount {

  private af: AngularFire;
  private database: AngularFireDatabase;

  private voteCountListObs: AppListObservable<VoteCount[]>;

  private list_url: string;


  private static instance: DaoVoteCount;

  static newInstance(af?: AngularFire): DaoVoteCount {
    if (!DaoVoteCount.instance) {
      DaoVoteCount.instance = new DaoVoteCount(af);
    }
    return DaoVoteCount.instance;
  }


  private getDaoDistrict(): DaoDistrict {
    return DaoDistrict.newInstance();
  }

  private getDaoRegion(): DaoRegion {
    return DaoRegion.newInstance();
  }

  private getDaoElection(): DaoElection {
    return DaoElection.newInstance();
  }

  private getDistrictObjectObservable(key: string, deep: number) {
    return this.getDaoDistrict().getDistrictObjectObservable(key, deep);
  }

  private getDistrictRaw($key: string) {
    return this.getDaoDistrict().getDistrictRaw($key);
  }

  private updateDistrictRaw(districtRaw: DistrictRaw) {
    return this.getDaoDistrict().updateDistrictRaw(districtRaw);
  }


  private getRegionObjectObservable(key: string, deep: number) {
    return this.getDaoRegion().getRegionObjectObservable(key, deep);
  }


  private getElectionRaw(key: string) {
    return this.getDaoElection().getElectionRaw(key);
  }

  constructor(af: AngularFire) {
    this.list_url = '/rest/vote-counts/';
    this.af = af;
    this.database = af.database;
  }


  private getListURL(): string {
    return this.list_url;
  }

  private getObjectURL(key: string): string {
    return `${this.getListURL()}${key}`;
  }

  ///////////
  // CRUD: Vote Count
  //


  private createVoteCount(voteCount: VoteCount): AppPromise<void> {
    return this.createVoteCountRaw(<VoteCountRaw>{
      count: voteCount.count,
      type: voteCount.type,
      district: voteCount.district,
      party: voteCount.party
    });
  }

  private createVoteCountRaw(raw: VoteCountRaw): AppPromise<any> {
    return this.getVoteCountListObservable().push(raw);
  }

  getVoteCountListObservable(): AppListObservable<VoteCount[]> {

    if (!this.voteCountListObs) {
      this.voteCountListObs = this.af.database.list('/rest/vote-counts');
    }
    return this.voteCountListObs;
  }

  getVoteCountListObservableFromRaw(raw: DistrictRaw, deep: number = 1): AppListObservableObject<VoteCount> {
    let list = new AppListObservableObject<VoteCount>();
    if (raw.voteCountList){
      let keyList: string[] = Object.keys(raw.voteCountList);
      keyList.forEach(key => {
        list.push(this.getVoteCountObjectObservable(key, deep));
      });
    }
    return list;
  }

  private getVoteCountRaw(key: string): AppObjectObservable<VoteCountRaw> {
    return <AppObjectObservable<VoteCountRaw>>this.af.database.object(`/rest/vote-counts/${key}`);
  }


  getVoteCountObjectObservable(id: string, deep: number = 1): AppObjectObservable<VoteCount> {
    return <AppObjectObservable<VoteCount>>this.getVoteCountRaw(id).map((voteCountRaw: VoteCountRaw) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        if (voteCountRaw.district === true) {
          voteCountRaw.district = this.getDistrictObjectObservable(
            Object.keys(voteCountRaw.district)[0], deep - 1);
        }

        if (voteCountRaw.party === true) {
          voteCountRaw.party = this.getRegionObjectObservable(
            Object.keys(voteCountRaw.party)[0], deep - 1);
        }
      }
      return VoteCount.fromRaw(voteCountRaw);
    });
  }


  private updateVoteCount(voteCount: VoteCount): AppPromise<void> {
    return this.updateVoteCountRaw(<VoteCountRaw>
      {
        $key: voteCount.id,
        count: voteCount.count,
        type: voteCount.type,
        district: voteCount.district,
        party: voteCount.party
      }
    );
  }


  private updateVoteCountRaw(raw: VoteCountRaw): AppPromise<void> {
    let i = this.getVoteCountRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }

  saveVoteCount(voteCount: VoteCount): AppPromise<void> {
    if (voteCount.id) {
      return this.updateVoteCount(voteCount);
    } else {
      return this.createVoteCount(voteCount);
    }
  }

  generateVoteCountListFromDistrict(districtRaw: DistrictRaw, electionRaw: ElectionRaw) {

    if (!districtRaw.voteCountList){
      this.addVoteCountToDistrict(districtRaw.$key, null, VoteType.BLANK);
      this.addVoteCountToDistrict(districtRaw.$key, null, VoteType.NULL);

      if (electionRaw.partyList) {
        Object.keys(electionRaw.partyList).forEach(partyKey => {
          this.addVoteCountToDistrict(districtRaw.$key, partyKey);
        });
      }
    }
  }

  addVoteCountToDistrict(districtKey: string, partyKey: string,
                                 type: VoteType = VoteType.VALID) {

    if (type == VoteType.VALID){
      return this.createVoteCountRaw(<VoteCountRaw>{
        count: 0,
        type: type,
        district: {
          [districtKey]: true
        },
        party: {
          [partyKey]: true
        }
      }).then((resolve) => {
        let s1 = this.af.database.object(resolve).subscribe((voteCountRaw: VoteCountRaw) => {
          let s2 = this.getDistrictRaw(districtKey).subscribe((districtRaw: DistrictRaw) => {
            if (!districtRaw.voteCountList) {
              districtRaw.voteCountList = {}
            }
            districtRaw.voteCountList[voteCountRaw.$key] = true;
            this.updateDistrictRaw(districtRaw).then(() => {
              s1.unsubscribe();
              s2.unsubscribe();
            })
          });
        });
      });
    } else {
      return this.createVoteCountRaw(<VoteCountRaw>{
        count: 0,
        type: type,
        district: {
          [districtKey]: true
        }
      }).then((resolve) => {
        let s1 = this.af.database.object(resolve).subscribe((voteCountRaw: VoteCountRaw) => {
          let s2 = this.getDistrictRaw(districtKey).subscribe((districtRaw: DistrictRaw) => {

            if (!districtRaw.voteCountList) {
              districtRaw.voteCountList = {}
            }
            districtRaw.voteCountList[voteCountRaw.$key] = true;
            this.updateDistrictRaw(districtRaw).then(() => {
              s1.unsubscribe();
              s2.unsubscribe();
            })
          });
        });
      });
    }
  }

  deleteVoteCount(key: string): AppPromise<void> {
    return this.getVoteCountRaw(key).remove();
  }
}

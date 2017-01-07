import {Election, ElectionRaw} from "./model/election";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {DistrictRaw} from "./model/district";
import {Subscription} from "rxjs";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {VoteCount, VoteCountRaw} from "./model/vote-count";
import {VoteType} from "./model/vote-type";
import {DaoRegion} from "./dao-region";
import {DaoDistrict} from "./dao-district";
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
    if(!DaoVoteCount.instance)  {
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


  constructor(af: AngularFire) {
    this.list_url ='/rest/vote-counts/';
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


  private getVoteCountRaw(key: string): AppObjectObservable<VoteCountRaw>{
    return <AppObjectObservable<VoteCountRaw>>this.af.database.object(`/rest/vote-counts/${key}`);
  }


  getVoteCountObjectObservable(id: string, deep: number = 1): AppObjectObservable<VoteCount> {
    return <AppObjectObservable<VoteCount>>this.getVoteCountRaw(id).map((voteCountRaw: VoteCountRaw) => {

      // TODO Refactor code to extract it in functions.
      if (deep) {
        if (voteCountRaw.district) {
          voteCountRaw.district = this.getDistrictObjectObservable(
            Object.keys(voteCountRaw.district)[0],
            deep - 1
          );
        }

        if (voteCountRaw.party) {
          voteCountRaw.party = this.getRegionObjectObservable(
            Object.keys(voteCountRaw.party)[0],
            deep - 1
          );
        }
      }
      return VoteCount.fromRaw(voteCountRaw);
    });
  }


  private updateVoteCount(voteCount: VoteCount):  AppPromise<void> {
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


  private updateVoteCountRaw(raw: VoteCountRaw):  AppPromise<void> {
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

  generateVoteCountList(districtRaw: DistrictRaw) {

    let s: Subscription = districtRaw.election.subscribe(electionRaw => {

      let partyKeys: string[];
      if (electionRaw.partyList) {
        partyKeys = Object.keys(electionRaw.partyList);
      } else {
        partyKeys = [];
      }

      this.createVoteCountRaw(<VoteCountRaw>{
        count: 0,
        type: VoteType.NULL,
        district: {
          [districtRaw.$key]: true
        },
      }).then((resolve) => {
        let s1 = this.af.database.object(resolve).subscribe((voteCountRaw: VoteCountRaw) => {
          let s2: Subscription = this.getDistrictRaw(districtRaw.$key).subscribe((districtRaw: DistrictRaw) => {

            if (!districtRaw.voteCountList) {
              districtRaw.voteCountList = {}
            }
            districtRaw.voteCountList[voteCountRaw.$key] = true;
            this.updateDistrictRaw(districtRaw).then(() => {
              s1.unsubscribe()
            })
          });
        });
      });

      this.createVoteCountRaw(<VoteCountRaw>{
        count: 0,
        type: VoteType.BLANK,
        district: {
          [districtRaw.$key]: true
        },
      }).then((resolve) => {
        let s1 = this.af.database.object(resolve).subscribe((voteCountRaw: VoteCountRaw) => {
          let s2: Subscription = this.getDistrictRaw(districtRaw.$key).subscribe((districtRaw: DistrictRaw) => {

            if (!districtRaw.voteCountList) {
              districtRaw.voteCountList = {}
            }
            districtRaw.voteCountList[voteCountRaw.$key] = true;
            this.updateDistrictRaw(districtRaw).then(() => {
              s1.unsubscribe()
            })
          });
        });
      });


      partyKeys.forEach(partyKey => {
        this.addVoteCountToDistrict(districtRaw.$key, partyKey);
      });

      s.unsubscribe();
    });

    return new AppListObservableObject<VoteCount>();

  }

  addVoteCountToDistrict(districtKey: string, partyKey: string) {
    console.log(<VoteCountRaw>{
      count: 0,
      type: VoteType.VALID,
      district: districtKey,
      party: partyKey
    });


    this.createVoteCountRaw(<VoteCountRaw>{
      count: 0,
      type: VoteType.VALID,
      district: {
        [districtKey]: true
      },
      party: {
        [partyKey]: true
      }
    }).then((resolve) => {
      let s1 = this.af.database.object(resolve).subscribe((voteCountRaw: VoteCountRaw) => {
        let s2: Subscription = this.getDistrictRaw(districtKey).subscribe((districtRaw: DistrictRaw) => {

          if (!districtRaw.voteCountList) {
            districtRaw.voteCountList = {}
          }
          districtRaw.voteCountList[voteCountRaw.$key] = true;
          this.updateDistrictRaw(districtRaw).then(() => {
            s1.unsubscribe()
          })
        });
      });
    });
  }

  deleteVoteCount(key: string): AppPromise<void> {
    return this.getVoteCountRaw(key).remove();
  }
}


import {Subscription} from "rxjs";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {DaoElection} from "./dao-election";
import {DaoRegion} from "./dao-region";
import {DaoVoteCount} from "./dao-vote-count";

import {AppListObservable} from "../shared/app-list-observable";
import {AppPromise} from "../shared/app-promise";
import {AppObjectObservable} from "../shared/app-object-observable";
import {AppListObservableObject} from "../shared/app-list-observable-object";

import {District, DistrictRaw} from "../model/district";
import {ElectionRaw} from "../model/election";
import {RegionRaw} from "../model/region";
import {VoteCount} from "../model/vote-count";
/**
 * Created by garciparedes on 07/01/2017.
 */

export class DaoDistrict {

  private af: AngularFire;
  private database: AngularFireDatabase;

  private districtListObs: AppListObservable<District[]>;

  private list_url: string;


  private static instance: DaoDistrict;

  static newInstance(af?: AngularFire): DaoDistrict {
    if (!DaoDistrict.instance) {
      DaoDistrict.instance = new DaoDistrict(af);
    }
    return DaoDistrict.instance;
  }

  constructor(af: AngularFire) {
    this.list_url = '/rest/districts/';
    this.af = af;
    this.database = af.database;
  }


  private getDaoElection(): DaoElection {
    return DaoElection.newInstance();
  }

  private getDaoRegion(): DaoRegion {
    return DaoRegion.newInstance();
  }

  private getDaoVoteCount(): DaoVoteCount {
    return DaoVoteCount.newInstance();
  }


  private getElectionRaw(electionId: string) {
    return this.getDaoElection().getElectionRaw(electionId);
  }

  private updateElectionRaw(electionRaw: ElectionRaw) {
    return this.getDaoElection().updateElectionRaw(electionRaw);

  }

  private getElectionObjectObservable(electionKey: string, number: number) {
    return this.getDaoElection().getElectionObjectObservable(electionKey, number);
  }


  private getRegionRaw(regionId: string) {
    return this.getDaoRegion().getRegionRaw(regionId);
  }


  private updateRegionRaw(regionRaw: RegionRaw) {
    return this.getDaoRegion().updateRegionRaw(regionRaw);
  }


  private getRegionObjectObservable(regionKey: string, number: number) {
    return this.getDaoRegion().getRegionObjectObservable(regionKey, number);
  }


  private deleteVoteCount(key: string) {
    return this.getDaoVoteCount().deleteVoteCount(key);
  }


  private generateVoteCountList(districtRaw: DistrictRaw, electionRaw: ElectionRaw) {
    return this.getDaoVoteCount().generateVoteCountListFromDistrict(districtRaw, electionRaw);
  }


  private getVoteCountListObservableFromRaw(districtRaw: DistrictRaw, deep: number): AppListObservableObject<VoteCount> {
    return this.getDaoVoteCount().getVoteCountListObservableFromRaw(districtRaw, deep);
  }

  private getListURL(): string {
    return this.list_url;
  }

  private getObjectURL(key: string): string {
    return `${this.getListURL()}${key}`;
  }

  ///////////
  // CRUD: District
  //


  private createDistrict(district: District): AppPromise<void> {
    return this.createDistrictRaw(<DistrictRaw>{
      seats: district.seats,
      census: district.census,
      election: district.election,
      region: district.region
    });
  }

  private createDistrictRaw(raw: DistrictRaw): AppPromise<any> {
    return this.getDistrictListObservable().push(raw);
  }

  getDistrictListObservable(): AppListObservable<District[]> {
    if (!this.districtListObs) {
      this.districtListObs = this.af.database.list('/rest/districts');
    }
    return this.districtListObs;
  }

  getDistrictListObservableFromRaw(raw: (ElectionRaw | RegionRaw), deep: number = 1): AppListObservableObject<District> {
    let keyList: string[] = Object.keys(raw.districtList);
    let districtList = new AppListObservableObject<District>();

    keyList.forEach(key => {
      districtList.push(this.getDistrictObjectObservable(key, deep));
    });
    return districtList;
  }


  //TODO
  getDistrictListObservableFromElectionKey(key: any, deep: number = 1): AppListObservable<District[]> {
    console.log(`/rest/elections/${key}/districtList`);
    return <AppListObservable<District[]>>
      this.af.database.list(`/rest/elections/${key}/districtList`).map((districtListRaw: any[]) => {
        console.log(districtListRaw);
        if (districtListRaw) {

          let keyList: string[] = Object.keys(districtListRaw);
          keyList.forEach(key => {
            districtListRaw[key] = this.getDistrictObjectObservable(key, deep);
          });
        }
        console.log(districtListRaw);
        return districtListRaw;
      });
  }


  getDistrictRaw(key: string): AppObjectObservable<DistrictRaw> {
    return <AppObjectObservable<DistrictRaw>>this.af.database.object(`/rest/districts/${key}`);
  }


  getDistrictObjectObservable(id: string, deep: number = 1): AppObjectObservable<District> {
    return <AppObjectObservable<District>>this.getDistrictRaw(id).map((districtRaw: DistrictRaw) => {
      // TODO Refactor code to extract it in functions.

      districtRaw.voteCountList = this.getVoteCountListObservableFromRaw(districtRaw, deep);

      if (deep) {
        if (districtRaw.election) {
          districtRaw.election = this.getElectionObjectObservable(Object.keys(districtRaw.election)[0], deep - 1);
        }

        if (districtRaw.region) {
          districtRaw.region = this.getRegionObjectObservable(Object.keys(districtRaw.region)[0], deep - 1);
        }
      }
      return District.fromRaw(districtRaw);
    });
  }


  private updateDistrict(district: District): AppPromise<void> {
    return this.updateDistrictRaw(<DistrictRaw>
      {
        $key: district.id,
        seats: district.seats,
        census: district.census,
      }
    );
  }


  updateDistrictRaw(raw: DistrictRaw): AppPromise<void> {
    let i = this.getDistrictRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }


  deleteDistrict(districtId: string) {
    let i: Subscription = this.getDistrictRaw(districtId).subscribe(district => {
      let electionId: string = Object.keys(district.election)[0];
      let regionId: string = Object.keys(district.region)[0];

      if (district.voteCountList){
        Object.keys(district.voteCountList).forEach((key) => {
          this.deleteVoteCount(key);
        });
      }


      let flag: boolean = false;


      let s1: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {

        if (electionRaw.districtList && electionRaw.districtList[districtId]) {
          delete electionRaw.districtList[districtId];
        }

        this.updateElectionRaw(electionRaw).then(() => {
          if (flag) {
            i.unsubscribe();

            this.getDistrictRaw(districtId).remove();
          } else {
            flag = true;
          }
          s1.unsubscribe();
        })
      });

      let s2: Subscription = this.getRegionRaw(regionId).subscribe((regionRaw: RegionRaw) => {

        if (regionRaw.districtList && regionRaw.districtList[districtId]) {
          delete regionRaw.districtList[districtId];
        }

        this.updateRegionRaw(regionRaw).then(() => {
          if (flag) {
            i.unsubscribe();
            this.getDistrictRaw(districtId).remove();
          } else {
            flag = true;
          }
          s2.unsubscribe();
        })
      });
    });
  }


  saveDistrict(district: District): AppPromise<void> {
    if (district.id) {
      return this.updateDistrict(district);
    } else {
      return this.createDistrict(district);
    }
  }


  addDistrictToElection(electionId: string, regionId: string) {
    this.createDistrictRaw(<DistrictRaw>{
      election: {
        [electionId]: true
      },
      region: {
        [regionId]: true
      }
    }).then((resolve) => {
      let s1 = this.database.object(resolve).subscribe((districtRaw: DistrictRaw) => {
        s1.unsubscribe();

        let s2: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {
          s2.unsubscribe();
          if (!electionRaw.districtList) {
            electionRaw.districtList = {}
          }
          electionRaw.districtList[districtRaw.$key] = true;
          this.updateElectionRaw(electionRaw);
          this.generateVoteCountList(districtRaw, electionRaw);
        });


        let s3: Subscription = this.getRegionRaw(regionId).subscribe((regionRaw: RegionRaw) => {
          s3.unsubscribe();

          if (!regionRaw.districtList) {
            regionRaw.districtList = {}
          }
          regionRaw.districtList[districtRaw.$key] = true;
          this.updateRegionRaw(regionRaw);
        });
      });
    });
  }
}

import {ElectionRaw} from "./model/election";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {District, DistrictRaw} from "./model/district";
import {Subscription} from "rxjs";
import {RegionRaw} from "./model/region";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {VoteCount} from "./model/vote-count";
import {DaoElection} from "./dao-election";
import {DaoRegion} from "./dao-region";
import {DaoVoteCount} from "./dao-vote-count";
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
    if(!DaoDistrict.instance)  {
      DaoDistrict.instance = new DaoDistrict(af);
    }
    return DaoDistrict.instance;
  }

  constructor(af: AngularFire) {
    this.list_url ='/rest/districts/';
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


  private generateVoteCountList(districtRaw: DistrictRaw) {
    return this.getDaoVoteCount().generateVoteCountList(districtRaw);
  }


  private getVoteCountObjectObservable(key: string, deep: number) {
    return this.getDaoVoteCount().getVoteCountObjectObservable(key, deep);
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


  getDistrictRaw(key: string): AppObjectObservable<DistrictRaw>{
    return <AppObjectObservable<DistrictRaw>>this.af.database.object(`/rest/districts/${key}`);
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



      if (districtRaw.voteCountList) {
        let voteCountKeys: string[];
        voteCountKeys = Object.keys(districtRaw.voteCountList);


        districtRaw.voteCountList = new AppListObservableObject<VoteCount>();
        voteCountKeys.map(key => {
          districtRaw.voteCountList.push(this.getVoteCountObjectObservable(key, deep));
        });

      } else {
        this.generateVoteCountList(districtRaw);
        districtRaw.voteCountList = new AppListObservableObject<VoteCount>();
      }
      return District.fromRaw(districtRaw);
    });
  }


  private updateDistrict(district: District):  AppPromise<void> {
    return this.updateDistrictRaw(<DistrictRaw>
      {
        $key: district.id,
        seats: district.seats,
        census: district.census,
      }
    );
  }


  updateDistrictRaw(raw: DistrictRaw):  AppPromise<void> {
    let i = this.getDistrictRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }



  deleteDistrict(districtId: string) {
    let i: Subscription = this.getDistrictRaw(districtId).subscribe(district => {
      let electionId: string = Object.keys(district.election)[0];
      let regionId: string = Object.keys(district.region)[0];
      let voteCountList: string[] = Object.keys(district.voteCountList);

      voteCountList.forEach((key) => {
        this.deleteVoteCount(key);
      });

      let flag: boolean = false;


      let s1: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {

        if(electionRaw.districtList && electionRaw.districtList[districtId]){
          delete electionRaw.districtList[districtId];
        }

        this.updateElectionRaw(electionRaw).then(() => {
          if (flag){
            i.unsubscribe();

            this.getDistrictRaw(districtId).remove();
          } else {
            flag = true;
          }
          s1.unsubscribe();
        })
      });

      let s2: Subscription = this.getRegionRaw(regionId).subscribe((regionRaw: RegionRaw) => {

        if(regionRaw.districtList && regionRaw.districtList[districtId]){
          delete regionRaw.districtList[districtId];
        }

        this.updateRegionRaw(regionRaw).then(() => {
          if (flag){
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
        let flag: boolean = false;

        let s2: Subscription = this.getElectionRaw(electionId).subscribe((electionRaw: ElectionRaw) => {

          if (!electionRaw.districtList) {
            electionRaw.districtList = {}
          }
          electionRaw.districtList[districtRaw.$key] = true;
          this.updateElectionRaw(electionRaw).then(() => {
            if (flag) {
              s1.unsubscribe()
            } else {
              flag = true;
            }
            s2.unsubscribe();
          })
        });


        let s3: Subscription = this.getRegionRaw(regionId).subscribe((regionRaw: RegionRaw) => {

          if (!regionRaw.districtList) {
            regionRaw.districtList = {}
          }
          regionRaw.districtList[districtRaw.$key] = true;
          this.updateRegionRaw(regionRaw).then(() => {
            if (flag) {
              s1.unsubscribe()
            } else {
              flag = true;
            }
            s3.unsubscribe();
          })
        });
      });
    });
  }
}

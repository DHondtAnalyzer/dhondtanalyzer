import {AppListObservable} from "../shared/app-list-observable";
import {AppPromise} from "../shared/app-promise";
import {AppObjectObservable} from "../shared/app-object-observable";
import {AppListObservableObject} from "../shared/app-list-observable-object";
import {District} from "../model/district";
import {RegionRaw, Region} from "../model/region";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {DaoDistrict} from "./dao-district";
/**
 * Created by garciparedes on 07/01/2017.
 */

export class DaoRegion {

  private af: AngularFire;
  private database: AngularFireDatabase;

  private regionListObs: AppListObservable<Region[]>;

  private list_url: string;

  private static instance: DaoRegion;

  static newInstance(af?: AngularFire): DaoRegion {
    if (!DaoRegion.instance) {
      DaoRegion.instance = new DaoRegion(af);
    }
    return DaoRegion.instance;
  }


  private constructor(af: AngularFire) {
    this.list_url = '/rest/regions/';
    this.af = af;
    this.database = af.database;
  }


  private getListURL(): string {
    return this.list_url;
  }

  private getObjectURL(key: string): string {
    return `${this.getListURL()}${key}`;
  }


  private getDaoDistrict(): DaoDistrict {
    return DaoDistrict.newInstance();
  }

  private getDistrictObjectObservable(key: string, deep: number) {
    return this.getDaoDistrict().getDistrictObjectObservable(key, deep);
  }

  private getDistrictListObservableFromRaw(regionRaw: RegionRaw,
                                           deep: number): AppListObservableObject<District> {
    return this.getDaoDistrict().getDistrictListObservableFromRaw(regionRaw, deep);
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


  getRegionRaw(key: string): AppObjectObservable<RegionRaw> {
    return <AppObjectObservable<RegionRaw>>this.af.database.object(`/rest/regions/${key}`);
  }


  getRegionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Region> {
    return <AppObjectObservable<Region>>this.getRegionRaw(id).map((region: RegionRaw) => {

      if (deep) {
        region.districtList = this.getDistrictListObservableFromRaw(region, deep);
      }
      return Region.fromRaw(region);
    });
  }


  updateRegion(region: Region): AppPromise<void> {
    return this.updateRegionRaw(<RegionRaw> {
      name: region.name,
      districtList: region.districtList.plainList()
    });
  }


  updateRegionRaw(raw: RegionRaw): AppPromise<void> {
    let i = this.getRegionRaw(raw.$key);
    delete raw.$exists;
    delete raw.$key;

    return i.update(raw);
  }


  deleteRegion(region: Region): AppPromise<void> {
    if (region.districtList.isEmpty()) {
      return this.getRegionRaw(region.id).remove();
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
}

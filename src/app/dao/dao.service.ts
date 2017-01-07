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
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {Subscription} from "rxjs";
import {DistrictRaw} from "./model/district";
import {VoteCount, VoteCountRaw} from "./model/vote-count";
import {VoteType} from "./model/vote-type";
import {DaoDistrict} from "./dao-district";
import {DaoElection} from "./dao-election";
import {DaoParty} from "./dao-party";
import {DaoRegion} from "./dao-region";
import {DaoVoteCount} from "./dao-vote-count";

@Injectable()
export class DaoService {

  private _electionList: Election[];
  private _partyList: Party[];
  private _regionList: Region[];
  private _districtList: District[];
  private _voteCountList: VoteCount[];


  private electionListObs: AppListObservable<Election[]>;
  private partyListObs: AppListObservable<Party[]>;
  private regionListObs: AppListObservable<Region[]>;
  private districtListObs: AppListObservable<District[]>;
  private voteCountListObs: AppListObservable<VoteCount[]>;

  private daoDistrict:DaoDistrict;
  private daoElection:DaoElection;
  private daoParty:DaoParty;
  private daoRegion:DaoRegion;
  private daoVoteCount:DaoVoteCount;

  constructor(private af: AngularFire) {
    this.daoDistrict = DaoDistrict.newInstance(af);
    this.daoElection = DaoElection.newInstance(af);
    this.daoParty = DaoParty.newInstance(af);
    this.daoRegion = DaoRegion.newInstance(af);
    this.daoVoteCount = DaoVoteCount.newInstance(af);
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
    return <AppObjectObservable<ElectionRaw>>this.af.database.object(`/rest/elections/${key}`);
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

    let s2: Subscription = this.getPartyRaw(partyId).subscribe((partyRaw: PartyRaw) => {

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





  addDistrictToElection(electionId: string, regionId: string) {


    this.createDistrictRaw(<DistrictRaw>{
      election: {
        [electionId]: true
      },
      region: {
        [regionId]: true
      }
    }).then((resolve) => {
      let s1 = this.af.database.object(resolve).subscribe((districtRaw: DistrictRaw) => {
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
    return <AppObjectObservable<PartyRaw>>this.af.database.object(`/rest/parties/${key}`);
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



  private getRegionRaw(key: string): AppObjectObservable<RegionRaw>{
    return <AppObjectObservable<RegionRaw>>this.af.database.object(`/rest/regions/${key}`);
  }



  getRegionObjectObservable(id: string, deep: number = 1): AppObjectObservable<Region> {
    return <AppObjectObservable<Region>>this.getRegionRaw(id).map((region: RegionRaw) => {

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
    return this.updateRegionRaw(<RegionRaw> {
        name: region.name,
        districtList: region.districtList.plainList()
      });
  }



  private updateRegionRaw(raw: RegionRaw):  AppPromise<void> {
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


  private updateDistrictRaw(raw: DistrictRaw):  AppPromise<void> {
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

  /*
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
  */

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

  private generateVoteCountList(districtRaw: DistrictRaw) {

    let s: Subscription = districtRaw.election.subscribe(electionRaw => {
      console.log(electionRaw);

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

  private deleteVoteCount(key: string): AppPromise<void> {
    return this.getVoteCountRaw(key).remove();
  }
}

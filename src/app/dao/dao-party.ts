import {Election} from "./model/election";
import {AppListObservable} from "./app-list-observable";
import {AppPromise} from "./app-promise";
import {AppObjectObservable} from "./app-object-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {Party, PartyRaw} from "./model/party";
import {AngularFire, AngularFireDatabase} from "angularfire2";
import {DaoElection} from "./dao-election";
/**
 * Created by garciparedes on 07/01/2017.
 */

export class DaoParty {

  private af: AngularFire;
  private database: AngularFireDatabase;

  private partyListObs: AppListObservable<Party[]>;

  private list_url: string;


  private static instance: DaoParty;

  static newInstance(af?: AngularFire): DaoParty {
    if (!DaoParty.instance) {
      DaoParty.instance = new DaoParty(af);
    }
    return DaoParty.instance;
  }


  constructor(af: AngularFire) {
    this.list_url = '/rest/parties/';
    this.af = af;
    this.database = af.database;
  }


  private getDaoElection(): DaoElection {
    return DaoElection.newInstance();
  }

  private getElectionObjectObservable(key: string, deep: number) {
    return this.getDaoElection().getElectionObjectObservable(key, deep);
  }


  private getListURL(): string {
    return this.list_url;
  }

  private getObjectURL(key: string): string {
    return `${this.getListURL()}${key}`;
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


  getPartyRaw(key: string): AppObjectObservable<PartyRaw> {
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


  private updateParty(party: Party): AppPromise<void> {
    return this.updatePartyRaw(<PartyRaw> {
        abbreviation: party.abbreviation,
        color: party.color,
        electionList: party.electionList.plainList(),
        $key: party.id,
        name: party.name,
      }
    );
  }


  updatePartyRaw(raw: PartyRaw): AppPromise<void> {
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

}

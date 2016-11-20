import { Election } from "./model/election";
import { Party } from "./model/party";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFire } from 'angularfire2';
import 'angularfire2/node_modules/firebase';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
// import 'firebase';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DaoService {

  constructor(private af: AngularFire) { }

  ///////////
  // CRUD: Election
  //

  createElection(id: string, election: Election): firebase.Promise<void>{
    return this.af.database.object('/rest/elections/'+id).set(election);
  }

  // FIXME: Property 'toArray' does not exist on type 'FirebaseListObservable<any[]>'
  getElections(): FirebaseListObservable<Election[]>{
    return this.af.database.list('/rest/elections');
  }

  // FIXME: Property 'toArray' does not exist on type 'FirebaseObjectObservable<any[]>'
  getElection(id: string): FirebaseObjectObservable<Election>{
    return this.af.database.object('/rest/elections/'+id);
  }

  updateElection(id: string, election: Election): firebase.Promise<void>{
    return this.af.database.object('/rest/rest/elections/'+id).update(election);
  }

  deleteElection(id: string): firebase.Promise<void>{
    return this.af.database.object('/rest/elections/'+id).remove();
  }

  ///////////
  // CRUD: Party
  //

  createParty(id: string, party: Party): firebase.Promise<void>{
    return this.af.database.object('/rest/partys/'+id).set(party);
  }

  // FIXME: Property 'toArray' does not exist on type 'FirebaseListObservable<any[]>'
  getPartys(): FirebaseListObservable<Party[]>{
    return this.af.database.list('/rest/partys');
  }

  // FIXME: Property 'toArray' does not exist on type 'FirebaseObjectObservable<any[]>'
  getParty(id: string): FirebaseObjectObservable<Party>{
    return this.af.database.object('/rest/partys/'+id);
  }

  updateParty(id: string, party: Party): firebase.Promise<void>{
    return this.af.database.object('/rest/partys/'+id).update(party);
  }

  deleteParty(id: string): firebase.Promise<void>{
    return this.af.database.object('/rest/partys/'+id).remove();
  }
}

import {Election} from "./model/election";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DaoService {

  private firebaseUrl = "https://dhondt-70561.firebaseio.com/rest/";
  private headers: Headers = new Headers({ 'Access-Control-Allow-Origin': '*'});
  private options: RequestOptions = new RequestOptions({ headers: this.headers});

  constructor(private http: Http) { }

  // TODO: generate auto id
  createElection(election: Election): Promise<Election>{
    return this.http.put(this.firebaseUrl+'elections.json', election, this.options).map((response) => {
          console.log(response);
          let election_raw = response.json();
          return Election.fromRaw(election_raw);
        }).toPromise();
  }

  getElections(): Promise<Election[]>{
    return this.http.get(this.firebaseUrl+'elections.json').map((response) => {
        console.log(response);
        let elections_raw = response.json();
        return elections_raw.map(Election.fromRaw);
      }).toPromise();
  }

  getElection(electionId: string): Promise<Election>{
    return this.http.get(this.firebaseUrl+'elections.json/'+electionId).map((response) => {
        let election_raw = response.json();
        return Election.fromRaw(election_raw);
      }).toPromise();
  }

}

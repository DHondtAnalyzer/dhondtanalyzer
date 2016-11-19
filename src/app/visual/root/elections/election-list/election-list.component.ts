import {Election, ElectionType} from "../../../../dao/";
import { DaoService } from "../../../../dao/";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-election-list',
  templateUrl: 'election-list.component.html',
  styleUrls: ['election-list.component.css']
})
export class ElectionListComponent implements OnInit {

  private elections: Election[] = [];

  constructor(private dao: DaoService) { }

  ngOnInit() {
    let test_election = Election.fromRaw({
      id: 'election1',
      name: 'Elecciones Generales',
      date: new Date(),
      seats: 5,
      type: ElectionType.GENERALES,
    });
    this.dao.createElection('election1',test_election).then(_ => {
      test_election.id = 'election1';
      console.log(test_election);
      this.dao.getElections().then((elections) => {
        console.log('after creation',elections);
        this.elections = elections;
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
    this.dao.getElections().then((elections) => {
      console.log('just after',elections);
    }).catch((error) => {
      console.error(error);
    });
  }
}

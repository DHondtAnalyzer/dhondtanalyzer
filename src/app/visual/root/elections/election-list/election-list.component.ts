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
      name: 'Elecciones Generales',
      date: new Date(),
      seats: 5,
      type: ElectionType.GENERALES,
    });
    this.dao.createElection(test_election).then((election) => {
      console.log(election);
      this.elections.push(election);
    }).catch((error) => {
      console.error(error);
    });
    this.dao.getElections().then((elections) => {
      console.log(elections);
      this.elections = elections;
    }).catch((error) => {
      console.error(error);
    });
  }
}

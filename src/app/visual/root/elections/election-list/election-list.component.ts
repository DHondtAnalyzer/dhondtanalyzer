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

  ngOnInit() {  }
}

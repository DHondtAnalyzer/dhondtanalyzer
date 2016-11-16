import {Component, OnInit} from '@angular/core';
import {DaoService} from "../../../../dao/dao.service";
import {Election} from "../../../../dao/model/election";

@Component({
    selector: 'app-election-list',
    templateUrl: 'election-list.component.html',
    styleUrls: ['election-list.component.css']
})
export class ElectionListComponent implements OnInit {

    private electionList: Election[];

    constructor(private daoService: DaoService) {
    }

    ngOnInit() {
        this.electionList = this.daoService.electionList;
    }

}

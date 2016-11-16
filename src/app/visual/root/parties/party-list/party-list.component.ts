import {Component, OnInit} from '@angular/core';
import {Party} from "../../../../dao/model/party";
import {DaoService} from "../../../../dao/dao.service";

@Component({
    selector: 'app-party-list',
    templateUrl: './party-list.component.html',
    styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

    private partyList: Party[];

    constructor(
        private daoService: DaoService
    ) {
    }

    ngOnInit() {
        this.partyList = this.daoService.partyList;
    }

}

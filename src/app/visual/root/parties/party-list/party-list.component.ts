import {Component, OnInit} from '@angular/core';
import {PartyBusinessService} from "../../../../business/parties/party-business.service";
import {Party} from "../../../../data/parties/party";

@Component({
    selector: 'app-party-list',
    templateUrl: './party-list.component.html',
    styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

    parties: Party[];

    constructor(
        private partyBusinessService: PartyBusinessService
    ) {
    }

    ngOnInit() {
        this.parties = this.partyBusinessService.getParties();
    }

}

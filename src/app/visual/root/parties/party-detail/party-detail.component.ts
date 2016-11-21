import {Component, OnInit,} from '@angular/core';

@Component({
    selector: 'app-party-detail',
    templateUrl: './party-detail.component.html',
    styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit{

    private _partyId: string;

    constructor() {
    }

    ngOnInit(){
    }


    get partyId(): string {
        return this._partyId
    }

    set partyId(partyKey: string) {
        this._partyId = partyKey;
    }

}

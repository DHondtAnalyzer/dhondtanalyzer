import {Component, OnInit, OnDestroy,} from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'app-party-detail',
    templateUrl: './party-detail.component.html',
    styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent {

    private _partyKey: string;

    constructor() {

    }


    get partyKey(): string {
        return this._partyKey
    }

    set partyKey(partyKey: string) {
        this._partyKey = partyKey;
        console.log(this.partyKey);
    }

}

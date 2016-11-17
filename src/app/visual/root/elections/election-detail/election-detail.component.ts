import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-election-detail',
    templateUrl: './election-detail.component.html',
    styleUrls: ['./election-detail.component.css']
})
export class ElectionDetailComponent implements OnInit {

    private _electionId: string;

    constructor() {
    }

    ngOnInit() {
    }


    get electionId(): string {
        return this._electionId
    }

    set electionId(partyKey: string) {
        this._electionId = partyKey;
    }

}

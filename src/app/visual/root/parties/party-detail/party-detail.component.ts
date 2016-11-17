import {Component, OnInit,} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-party-detail',
    templateUrl: './party-detail.component.html',
    styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit{

    private _partyId: string;

    constructor(
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(){
        this.readRoute();
    }

    readRoute():void {
        this.route.params
            .forEach((params: Params) => {
                if (params['id'] !== undefined) {
                    this.partyId = params['id'];
                }
        });
    }


    get partyId(): string {
        return this._partyId
    }

    set partyId(partyKey: string) {
        this._partyId = partyKey;
    }

}

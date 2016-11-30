import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Party} from "../../../../dao/model/party";
import {Router} from "@angular/router";
import {DaoService} from "../../../../dao/dao.service";

@Component({
    selector: 'app-party-grid',
    templateUrl: './party-grid.component.html',
    styleUrls: ['./party-grid.component.css']
})
export class PartyGridComponent implements OnInit {

    @Input() partyList: Party[];
    @Input() editable: boolean;
    @Output() onRoute = new EventEmitter<void>();

    constructor(private daoService: DaoService) {
    }

    ngOnInit() {
    }


    private addParty(party: Party): void {
        if (party) {
            this.partyList.push(party);
        }
    }


    private remove(party: Party) {
        this.partyList.splice(this.partyList.indexOf(party, 0), 1);
    }


    private routeChanged(): void {
        this.onRoute.emit()
    }


    private get posibleParties(): Party[] {

        // Necessary because of JS function scope
        let self: PartyGridComponent = this;

        return this.daoService.partyList.filter(function (value) {
                for (let i: number = 0; i < self.partyList.length; i++) {
                    if (self.partyList[i].id === value.id) {
                        return false;
                    }
                }
                return true;
            }
        );
    }

}

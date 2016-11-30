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
    @Input() searchable: boolean;
    @Input() big: boolean;

    @Output() onView = new EventEmitter<Party>();

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


    private view(party: Party) {
        this.onView.emit(party)
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

    get cardColClass(): string {
        if (this.big) {
            return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        } else {
            return 'col-xs-12 col-sm-6 col-md-4';
        }
    }

}

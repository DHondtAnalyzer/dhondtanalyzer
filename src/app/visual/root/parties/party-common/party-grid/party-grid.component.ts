import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Party} from "../../../../../dao/model/party";
import {DaoService} from "../../../../../dao/dao.service";
import {AppListObservable} from "../../../../../dao/app-list-observable";

@Component({
    selector: 'app-party-grid',
    templateUrl: './party-grid.component.html',
    styleUrls: ['./party-grid.component.css']
})
export class PartyGridComponent implements OnInit {


    private _filteredPartyList: Party[];

    @Input() partyList: AppListObservable<Party[]>;
    @Input() editable: boolean;
    @Input() searchable: boolean;
    @Input() big: boolean;

    @Output() onView = new EventEmitter<string>();

    constructor(private daoService: DaoService) {
    }


    ngOnInit() {
      this.partyList.subscribe(parties => {
        this.filteredPartyList = parties;
      });
    }

  get filteredPartyList(): Party[] {
    return this._filteredPartyList;
  }

  set filteredPartyList(value: Party[]) {
    this._filteredPartyList = value;
  }

    private addParty(party: Party): void {
        if (party) {
            this.partyList.push(party);
        }
    }


    private remove(party: Party) {
        this.filteredPartyList.splice(this.filteredPartyList.indexOf(party, 0), 1);
    }


    private view(id: string) {
        this.onView.emit(id)
    }


    private get posibleParties(): Party[] {

        // Necessary because of JS function scope
        let self: PartyGridComponent = this;

        return this.daoService.getParties().filter(function (value) {
          //TODO
          return true;
                /*
                for (let i: number = 0; i < self.filteredPartyList.length; i++) {
                    if (self.partyList[i].id === value.id) {
                        return false;
                    }
                }
                return true;
                */
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

    search(filtered: AppListObservable<Party[]>){
      filtered.subscribe(parties => {
        this.filteredPartyList = parties;
      });
    }
}

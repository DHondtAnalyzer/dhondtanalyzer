import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Party} from "../../../../../dao/model/party";
import {DaoService} from "../../../../../dao/dao.service";
import {AppListObservable} from "../../../../../dao/app-list-observable";
import {AppList} from "../../../../../dao/app-list";
import {AppListObservableObject} from "../../../../../dao/app-list-observable-object";

@Component({
    selector: 'app-party-grid',
    templateUrl: './party-grid.component.html',
    styleUrls: ['./party-grid.component.css']
})
export class PartyGridComponent implements OnInit, OnChanges {


  private _filteredPartyList: AppList<Party>;

  @Input() partyList: AppList<Party>;
    @Input() editable: boolean;
    @Input() searchable: boolean;
    @Input() big: boolean;

  @Output() onView = new EventEmitter<string>();
  @Output() onPush = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

    constructor(private daoService: DaoService) {
    }


  ngOnInit() {
    this.filteredPartyList = this.partyList;

    this.filteredPartyList.subscribe(e => {console.log(e);})
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredPartyList = this.partyList;
  }

  get filteredPartyList(): AppList<Party> {
    return this._filteredPartyList;
  }

  set filteredPartyList(value: AppList<Party>) {
    this._filteredPartyList = value;
  }

    private add(id: string): void {
      this.onPush.emit(id)
    }


  private remove(id: string) {
    this.onRemove.emit(id)
  }


    private view(id: string) {
        this.onView.emit(id)
    }


    private get posibleParties(): AppList<Party> {

        // Necessary because of JS function scope
        let self: PartyGridComponent = this;

        return <AppList<Party>>this.daoService.getPartyListObservable().filter(function (value) {
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

  search(filtered: AppListObservable<Party[]>) {
    this.filteredPartyList = filtered
  }
}

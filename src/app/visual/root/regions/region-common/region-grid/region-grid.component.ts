import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Region} from "../../../../../dao/model/region";
import {AppListObservable} from "../../../../../dao/app-list-observable";

@Component({
    selector: 'app-region-grid',
    templateUrl: './region-grid.component.html',
    styleUrls: ['./region-grid.component.css']
})
export class RegionGridComponent implements OnInit {

  private _filteredRegionList: Region[];


  @Input() regionList: AppListObservable<Region[]>;
    @Input() searchable: boolean;
    @Input() big: boolean;

  @Output() onView = new EventEmitter<string>();

    constructor() {
    }

  ngOnInit() {
    this.regionList.subscribe(items => {
      this.filteredRegionList = items;
    });
  }

  get filteredRegionList(): Region[] {
    return this._filteredRegionList;
  }

  set filteredRegionList(value: Region[]) {
    this._filteredRegionList = value;
  }

  private view(id: string) {
      this.onView.emit(id)
  }

    get cardColClass(): string {
        if (this.big) {
            return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        } else {
            return 'col-xs-12 col-sm-6 col-md-4';
        }
    }



  search(filtered: AppListObservable<Region[]>){
    filtered.subscribe(items => {
      this.filteredRegionList = items;
    });
  }
}

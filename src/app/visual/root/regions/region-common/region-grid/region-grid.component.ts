import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Region} from "../../../../../dao/model/region";
import {AppListObservable} from "../../../../../dao/app-list-observable";
import {AppList} from "../../../../../dao/app-list";

@Component({
    selector: 'app-region-grid',
    templateUrl: './region-grid.component.html',
    styleUrls: ['./region-grid.component.css']
})
export class RegionGridComponent implements OnInit {

  private _filteredRegionList: AppList<Region>;


  @Input() regionList: AppList<Region>;
    @Input() searchable: boolean;
    @Input() big: boolean;

  @Output() onView = new EventEmitter<string>();

    constructor() {
    }

  ngOnInit() {
    this.filteredRegionList = this.regionList;
  }

  get filteredRegionList(): AppList<Region> {
    return this._filteredRegionList;
  }

  set filteredRegionList(value: AppList<Region>) {
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



  search(filtered: AppList<Region>){
    this.filteredRegionList = filtered
  }
}

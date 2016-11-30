import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Region} from "../../../../dao/model/region";

@Component({
    selector: 'app-region-grid',
    templateUrl: './region-grid.component.html',
    styleUrls: ['./region-grid.component.css']
})
export class RegionGridComponent implements OnInit {

    private filteredRegionList: Region[];


    @Input() regionList: Region[];
    @Input() searchable: boolean;
    @Input() big: boolean;

    @Output() onView = new EventEmitter<Region>();

    constructor() {
    }

    ngOnInit() {
        this.filteredRegionList = this.regionList;
    }


    private view(region: Region) {
        this.onView.emit(region)
    }

    get cardColClass(): string {
        if (this.big) {
            return 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        } else {
            return 'col-xs-12 col-sm-6 col-md-4';
        }
    }



    search(filtered: Region[]){
        this.filteredRegionList = filtered;
    }
}

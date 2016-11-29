import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {District} from "../../../../dao/model/district";

@Component({
    selector: 'app-district-grid',
    templateUrl: './district-grid.component.html',
    styleUrls: ['./district-grid.component.css']
})
export class DistrictGridComponent implements OnInit {


    @Input() districtList: District[];
    @Output() onRoute = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit() {
    }


    private addDistrict(): void {
        //this.districtList.push(new District());
    }

    private remove(district: District) {
        this.districtList.splice(this.districtList.indexOf(district,0),1);
    }

    private routeChanged(): void {
        this.onRoute.emit()
    }
}

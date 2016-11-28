import {Component, OnInit, Input} from '@angular/core';
import {District} from "../../../../dao/model/district";

@Component({
    selector: 'app-district-grid',
    templateUrl: './district-grid.component.html',
    styleUrls: ['./district-grid.component.css']
})
export class DistrictGridComponent implements OnInit {


    @Input() districtList: District[];

    constructor() {
    }

    ngOnInit() {
    }


    private addDistrict(): void {
        this.districtList.push(new District());
    }

    private remove(index: number) {
        this.districtList.splice(index);
    }
}

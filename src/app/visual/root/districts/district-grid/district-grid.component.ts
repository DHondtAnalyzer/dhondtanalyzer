import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {District} from "../../../../dao/model/district";
import {DaoService} from "../../../../dao/dao.service";
import {Region} from "../../../../dao/model/region";

@Component({
    selector: 'app-district-grid',
    templateUrl: './district-grid.component.html',
    styleUrls: ['./district-grid.component.css']
})
export class DistrictGridComponent implements OnInit {


    @Input() districtList: District[];
    @Input() editable: boolean;
    @Output() onRoute = new EventEmitter<void>();

    constructor(private daoService: DaoService) {
    }

    ngOnInit() {
    }


    private addDistrict(region: Region): void {
        if (region) {
            this.districtList.push(District.newInstance(region));
        }
    }

    private remove(district: District) {
        this.districtList.splice(this.districtList.indexOf(district, 0), 1);
    }

    private routeChanged(): void {
        this.onRoute.emit()
    }

    private get posibleRegions(): Region[] {

        //TODO FILTER REGIONS!!!!

        return this.daoService.regionList.filter(
            function (value) {
                return true;
            }
        );

    }
}

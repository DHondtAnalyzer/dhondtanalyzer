import {Component, OnInit, Input} from '@angular/core';
import {District} from "../../../../dao/model/district";

@Component({
    selector: 'app-district-grid',
    templateUrl: './district-grid.component.html',
    styleUrls: ['./district-grid.component.css']
})
export class DistrictGridComponent implements OnInit {

    private tile = {cols: 3, rows: 1,};

    @Input() districtList: District[];

    constructor() {
    }

    ngOnInit() {
    }

    private getDistricts() {
        return this.districtList;
    }

    private addDistrict(): void {
        if (this.tile.cols == 3){
            this.tile = {cols: 6, rows: 2, };
        } else {
            this.tile = {cols: 3, rows: 1, };
        }
    }

    /**
     * Función gotoElection.
     *
     * Cambia la ruta de la web hacia la elección seleccionada.
     * @param district
     */
    private goToDistrict(district: District): void {
        //this.route.navigate(['/app/elections']);
        //this.closeDialog();
        console.log(district);

    }
}

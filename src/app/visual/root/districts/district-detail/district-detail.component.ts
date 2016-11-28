import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {District} from "../../../../dao/model/district";
import {Router} from "@angular/router";

@Component({
  selector: 'app-district-detail',
  templateUrl: 'district-detail.component.html',
  styleUrls: ['district-detail.component.css']
})
export class DistrictDetailComponent implements OnInit {


    @Input() district: District;
    @Output() onRemove = new EventEmitter<District>();

    private editing: boolean;

    constructor(private route: Router) { }

    ngOnInit() {
        if (!this.district.name) {
            this.editing = true;
        }
    }

    private save(){
        this.editing = false;
    }

    private edit() {
        this.editing = true;
    }

    private view() {
        this.route.navigate(['/app/regions', this.district.region.id]);
    }


    private remove() {
        this.onRemove.emit(this.district);
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

import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {District} from "../../../../dao/model/district";
import {Router} from "@angular/router";

@Component({
  selector: 'app-district-resume',
  templateUrl: 'district-detail.component.html',
  styleUrls: ['district-detail.component.css']
})
export class DistrictResumeComponent implements OnInit {


    @Input() district: District;
    @Output() onRemove = new EventEmitter<District>();
    @Output() onRoute = new EventEmitter<void>();

    private editing: boolean;

    constructor(private route: Router) { }

    ngOnInit() {
        if (!this.district.region || ! this.district.census ||
            !this.district.seats) {

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
        this.onRoute.emit();
        this.route.navigate(['/app/regions', this.district.region.id]);
    }


    private remove() {
        this.onRemove.emit(this.district);
    }
}

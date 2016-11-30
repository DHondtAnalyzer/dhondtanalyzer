import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {Region} from "../../../../dao/model/region";

@Component({
  selector: 'app-region-resume',
  templateUrl: './region-resume.component.html',
  styleUrls: ['./region-resume.component.css']
})
export class RegionResumeComponent {

    @Input() region: Region;

    @Output() onRemove = new EventEmitter<Region>();
    @Output() onView = new EventEmitter<Region>();

    constructor() { }


    private view() {
        this.onView.emit(this.region);
    }


    private remove() {
        this.onRemove.emit(this.region);
    }
}

import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Election} from "../../../../../dao/model/election";

@Component({
    selector: 'app-election-resume',
    templateUrl: 'election-resume.component.html',
    styleUrls: ['election-resume.component.css']
})
export class ElectionResumeComponent {


    @Input() election: Election;
    @Input() editable: boolean;

    @Output() onRemove = new EventEmitter<Election>();
    @Output() onView = new EventEmitter<Election>();

    constructor() { }


    private view() {
        this.onView.emit(this.election);
    }


    private remove() {
        this.onRemove.emit(this.election);
    }
}

import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Party} from "../../../../../dao/model/party";

@Component({
    selector: 'app-party-resume',
    templateUrl: './party-resume.component.html',
    styleUrls: ['./party-resume.component.css']
})
export class PartyResumeComponent {


    @Input() party: Party;
    @Input() editable: boolean;

    @Output() onRemove = new EventEmitter<string>();
    @Output() onView = new EventEmitter<string>();

    constructor() { }


    private view() {
        this.onView.emit(this.party.id);
    }


    private remove() {
        this.onRemove.emit(this.party.id);
    }
}

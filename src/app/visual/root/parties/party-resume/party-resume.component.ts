import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Party} from "../../../../dao/model/party";

@Component({
    selector: 'app-party-resume',
    templateUrl: 'party-resume.component.html',
    styleUrls: ['party-resume.component.css']
})
export class PartyResumeComponent {


    @Input() party: Party;
    @Input() editable?: boolean;
    @Output() onRemove = new EventEmitter<Party>();
    @Output() onView = new EventEmitter<Party>();

    constructor() { }


    private view() {
        this.onView.emit(this.party);
    }


    private remove() {
        this.onRemove.emit(this.party);
    }
}

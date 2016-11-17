import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
    selector: 'app-party-detail',
    templateUrl: './party-detail.component.html',
    styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {

    constructor(dialogRef?: MdDialogRef<PartyDetailComponent>) {
    }

    ngOnInit() {
    }

}

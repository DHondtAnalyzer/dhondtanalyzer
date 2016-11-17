import {Location} from '@angular/common';
import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {MdDialog, MdDialogRef} from "@angular/material";

import {PartyDetailComponent} from "../party-detail/party-detail.component";

import {Party} from "../../../../dao/model/party";
import {DaoService} from "../../../../dao/dao.service";

@Component({
    selector: 'app-party-list',
    templateUrl: './party-list.component.html',
    styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {

    dialogRef: MdDialogRef<PartyDetailComponent>;

    private partyList: Party[];

    constructor(private dialog: MdDialog,
                private viewContainerRef: ViewContainerRef,
                private daoService: DaoService,
                private location: Location) {
    }

    ngOnInit() {
        this.partyList = this.daoService.partyList;
    }

    openDialog(partyId: string) {

        let basePath = this.location.path();

        this.dialogRef = this.dialog.open(PartyDetailComponent, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });

        this.dialogRef.componentInstance.partyId = partyId;
        this.location.go(basePath + "/" + partyId);

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;
        });
    }

}

import {Location} from '@angular/common';
import {Component, OnInit, ViewContainerRef} from '@angular/core';

import {MdDialog, MdDialogRef} from "@angular/material";

import {PartyDetailComponent} from "../party-detail/party-detail.component";

import {Party} from "../../../../dao/model/party";
import {DaoService} from "../../../../dao/dao.service";
import {Params, ActivatedRoute} from "@angular/router";

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
                private location: Location,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.partyList = this.daoService.partyList;
        this.readRoute();
    }

    readRoute(): void {
        this.route.params
            .forEach((params: Params) => {
                if (params['id'] !== undefined) {
                    this.openDialog(params['id'], true);
                }
            });
    }

    openDialog(partyId: string, navigated = false) {

        let basePath = this.location.path();

        this.dialogRef = this.dialog.open(PartyDetailComponent, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });

        this.dialogRef.componentInstance.partyId = partyId;
        if (!navigated){
            this.location.go(basePath + "/" + partyId);
        }

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;

            if(navigated){
                navigated = false;
                basePath = basePath.split('/' + partyId)[0];
                this.location.go(basePath);
            }
        });

    }

}

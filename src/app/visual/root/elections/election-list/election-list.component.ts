import {Component, OnInit, Input, ViewContainerRef} from '@angular/core';
import {DaoService} from "../../../../dao/dao.service";
import {Election} from "../../../../dao/model/election";
import {ElectionDetailComponent} from "../election-detail/election-detail.component";
import {Params, ActivatedRoute} from "@angular/router";
import {MdDialog, MdDialogRef} from "@angular/material";
import {Location} from '@angular/common';

@Component({
    selector: 'app-election-list',
    templateUrl: 'election-list.component.html',
    styleUrls: ['election-list.component.css']
})
export class ElectionListComponent implements OnInit {

    dialogRef: MdDialogRef<ElectionDetailComponent>;

    private electionList: Election[];

    constructor(
        private daoService: DaoService,
        private dialog: MdDialog,
        private viewContainerRef: ViewContainerRef,
        private route: ActivatedRoute,
        private location: Location)
    {
    }

    ngOnInit() {
        this.electionList = this.daoService.electionList;
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

    openDialog(electionId: string, navigated = false) {

        let basePath = this.location.path();

        this.dialogRef = this.dialog.open(ElectionDetailComponent, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });

        this.dialogRef.componentInstance.electionId = electionId;
        if (!navigated){
            this.location.go(basePath + "/" + electionId);
        }

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;

            if(navigated){
                navigated = false;
                basePath = basePath.split('/' + electionId)[0];
                this.location.go(basePath);
            }
        });

    }
}

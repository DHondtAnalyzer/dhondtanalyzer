/**
 * Created by garciparedes on 10/11/2016.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {PartyRoutingModule} from "./party-routing.module";

import {PartyListComponent} from "./party-list/party-list.component";
import {PartyDetailComponent} from "./party-detail/party-detail.component";


@NgModule({
    declarations: [
        PartyListComponent,
        PartyDetailComponent
    ],
    entryComponents: [
        PartyDetailComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PartyRoutingModule
    ],
    providers: []
})
export class PartyModule {
}

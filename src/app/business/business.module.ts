/**
 * Created by garciparedes on 15/11/2016.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {DataModule} from "../data/data.module";

import {ElectionBusinessService} from "./elections/election-business.service";
import {PartyBusinessService} from "./parties/party-business.service";

@NgModule({
    imports: [
        DataModule,
        CommonModule
    ],
    providers: [
        ElectionBusinessService,
        PartyBusinessService
    ],
})
export class BusinessModule {
}

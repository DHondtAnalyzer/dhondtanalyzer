import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PartyDataService} from "./parties/party-data.service";
import {ElectionDataService} from "./elections/election-data.service";

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ElectionDataService,
        PartyDataService
    ],
})
export class DataModule {
}

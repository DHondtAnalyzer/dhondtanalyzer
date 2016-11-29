import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@angular/material";

import {FormsModule} from "@angular/forms";
import {DistrictCommonModule} from "./district-common.module";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        DistrictCommonModule,
    ],
    declarations: [],
    exports: [],
})
export class DistrictModule {
}

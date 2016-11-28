import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@angular/material";

import {DistrictGridComponent} from "./district-grid/district-grid.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
    ],
    declarations: [
        DistrictGridComponent
    ],
    exports: [
        DistrictGridComponent
    ]
})
export class DistrictModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@angular/material";

import {DistrictGridComponent} from "./district-grid/district-grid.component";
import {FormsModule} from "@angular/forms";
import {DistrictDetailComponent} from './district-detail/district-detail.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
    ],
    declarations: [
        DistrictGridComponent,
        DistrictDetailComponent
    ],
    exports: [
        DistrictGridComponent
    ]
})
export class DistrictCommonModule {
}

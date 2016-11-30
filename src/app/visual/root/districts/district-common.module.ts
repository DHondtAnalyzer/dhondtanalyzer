import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from "@angular/material";

import {DistrictGridComponent} from "./district-grid/district-grid.component";
import {FormsModule} from "@angular/forms";
import {DistrictResumeComponent} from './district-resume/district-resume.component';
import {SharedModule} from "../../shared/shared.module";
import {DaoModule} from "../../../dao/dao.module";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        SharedModule,
        DaoModule,
    ],
    declarations: [
        DistrictGridComponent,
        DistrictResumeComponent
    ],
    exports: [
        DistrictGridComponent
    ]
})
export class DistrictCommonModule {
}

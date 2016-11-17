/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule } from '@angular/core';

import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {ElectionRoutingModule} from "./election-routing.module";

import {ElectionListComponent} from "./election-list/election-list.component";
import {ElectionDetailComponent} from "./election-detail/election-detail.component";

@NgModule({
    declarations: [
        ElectionListComponent,
        ElectionDetailComponent
    ],
    entryComponents: [
        ElectionDetailComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ElectionRoutingModule
    ],
    providers: []
})
export class ElectionModule { }

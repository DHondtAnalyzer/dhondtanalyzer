/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule } from '@angular/core';

import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {ToolbarComponent} from "../shared/toolbar/toolbar.component";
import {ContainerComponent} from "../shared/container/container.component";
import {HomeComponent} from "./home/home.component";
import {ElectionListComponent} from "./elections/election-list/election-list.component";
import {RootComponent} from "./root.component";
import {RootRoutingModule} from "./root-routing.module";


@NgModule({
    declarations: [
        ToolbarComponent,
        ContainerComponent,
        HomeComponent,
        ElectionListComponent,
        RootComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RootRoutingModule
    ],
    providers: []
})
export class RootModule { }

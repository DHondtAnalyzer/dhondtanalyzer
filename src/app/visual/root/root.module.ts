/**
 * Created by garciparedes on 10/11/2016.
 */
import { NgModule } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { ToolbarComponent } from "../shared/toolbar/toolbar.component";
import { ContainerComponent } from "../shared/container/container.component";
import { RootComponent } from "./root.component";
import { HomeComponent } from "../home/home.component";
import { ElectionListComponent } from "../elections/election-list/election-list.component";
import { RootRoutingModule } from "./root-routing.module";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
    declarations: [
        ToolbarComponent,
        ContainerComponent,
        RootComponent,
        HomeComponent,
        ElectionListComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        RootRoutingModule
    ],
    providers: []
})
export class RootModule { }

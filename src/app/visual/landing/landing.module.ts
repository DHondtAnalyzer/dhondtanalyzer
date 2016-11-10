/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule } from '@angular/core';

import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

import {LandingRoutingModule} from "./landing-routing.module";
import {LandingComponent} from "./landing.component";


@NgModule({
    declarations: [
        LandingComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LandingRoutingModule,
    ],
    providers: []
})
export class LandingModule { }

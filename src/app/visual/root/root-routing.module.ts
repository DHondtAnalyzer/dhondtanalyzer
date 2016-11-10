/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule }     from '@angular/core';

import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RootComponent} from "./root.component";
import {ElectionListComponent} from "./elections/election-list/election-list.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: RootComponent,
                children: [
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: HomeComponent },
                    { path: 'elections', component: ElectionListComponent }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule {}

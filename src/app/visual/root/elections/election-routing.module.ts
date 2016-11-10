/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule }     from '@angular/core';

import { RouterModule } from '@angular/router';

import {ElectionListComponent} from "./election-list/election-list.component";
import {ElectionDetailComponent} from "./election-detail/election-detail.component";





@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: '', component: ElectionListComponent },
                    { path: ':id', component: ElectionDetailComponent },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class ElectionRoutingModule {}

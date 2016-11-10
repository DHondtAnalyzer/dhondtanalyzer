/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {PartyListComponent} from "./party-list/party-list.component";
import {PartyDetailComponent} from "./party-detail/party-detail.component";




@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: '', component: PartyListComponent },
                    { path: ':id', component: PartyDetailComponent },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PartyRoutingModule {}

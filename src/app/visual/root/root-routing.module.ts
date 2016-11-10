/**
 * Created by garciparedes on 10/11/2016.
 */

import { NgModule }     from '@angular/core';

import { RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RootComponent} from "./root.component";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: RootComponent,
                children: [
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: HomeComponent },
                    { path: 'elections', loadChildren: 'app/visual/root/elections/election.module#ElectionModule' },
                    { path: 'parties', loadChildren: 'app/visual/root/parties/party.module#PartyModule'  },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule {}

/**
 * Created by garciparedes on 10/11/2016.
 */
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { ElectionListComponent } from "../elections/election-list/election-list.component";
import { RootComponent } from "./root.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: RootComponent,
                children: [
                    { path: '', redirectTo: '/home', pathMatch: 'full' },
                    { path: 'home', component: HomeComponent},
                    { path: 'elections', component: ElectionListComponent},
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RootRoutingModule {}

import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import {RootModule} from "./visual/root/root.module";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: RootModule },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

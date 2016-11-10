import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', loadChildren: 'app/visual/landing/landing.module#LandingModule' },
            { path: 'app', loadChildren: 'app/visual/root/root.module#RootModule'},
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

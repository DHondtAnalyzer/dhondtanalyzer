import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuard} from "./shared/auth/auth.guard";
// import { DaoComponent } from './dao/dao.component';
import { DaoModule } from "./dao/dao.module";
import { AngularFireModule } from 'angularfire2';

let http : Http;
//
// http.request('./config.json').map(res => {
//   let data = res.json();
//   firebaseConfig = data.firebase;
// })

@NgModule({
    declarations: [
        AppComponent,
        // DaoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AppRoutingModule,
        DaoModule,
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}

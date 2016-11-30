import './polyfills.ts';

import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import {MaterialModule} from '@angular/material';

import {AppComponent} from './app/app.component';
import {AppRoutingModule} from "./app/app-routing.module";
import {AuthGuard} from "./app/shared/auth/auth.guard";
// import { DaoComponent } from './dao/dao.component';
import { DaoModule } from "./app/dao/dao.module";
import { AngularFireModule } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

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

// declare var jQuery;
//
// export var firebaseConfig = {};
//
// jQuery.getJSON('./config.json').then(
//   function(data, textStatus, jqXHR){
//     firebaseConfig = data.firebase;
//     console.info('Using the follow app config', data);
//     run();
//   }, function (jqXHR, textStatus, errorThrown) {
//     if (jqXHR.status === 404) {
//       console.info('Using the default app config');
//       run();
//     } else
//       console.error('[AppConfigLoader]', errorThrown, textStatus, jqXHR);
// });
//
// function run(){
//   if (environment.production) {
//     enableProdMode();
//   }
//
//   // platformBrowserDynamic().bootstrapModule(AppModule);
//
// }

declare var jQuery;

jQuery.getJSON('./config.json').then(
  function (data, textStatus, jqXHR) {
    // let appConfig = AppConfig.fromRaw(data);
    let appConfig = data;
    console.info('Using the follow app config', data);
    run(appConfig);
  }, function (jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 404) {
      // let appConfig = AppConfig.fromRaw({});
      let appConfig = {};
      console.info('Using the default app config');
      run(appConfig);
    } else
      console.error('[AppConfigLoader]', errorThrown, textStatus, jqXHR);
  });


function run(appConfig: any) {

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic().bootstrapModule(AppComponent, [
    // provide('AppConfig', {useValue: appConfig}),
    // appRouterProviders,
    // disableDeprecatedForms(),
    // provideForms(),
    // LayoutService,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    DaoModule,
    AuthGuard,
    // AuthService,
    // ProxyService,
    // DomeService
    AngularFireModule.initializeApp(appConfig.firebase)
  ]).catch(err => console.error(err));

}

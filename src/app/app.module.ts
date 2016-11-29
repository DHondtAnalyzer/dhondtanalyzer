import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthGuard} from "./shared/auth/auth.guard";
import {DaoModule} from "./dao/dao.module";
import { AutocompleteInputComponent } from './visual/shared/autocomplete-input/autocomplete-input.component';


/**
 * Clase AppModule. Implementa la funcionalidad de un Modulo.
 *
 * AppModule es el módulo raíz de la aplicación.
 */
@NgModule({
    declarations: [
        AppComponent,
        AutocompleteInputComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AppRoutingModule,
        DaoModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {


    /**
     * Constructor de la clase.
     */
    constructor() {
    }
}

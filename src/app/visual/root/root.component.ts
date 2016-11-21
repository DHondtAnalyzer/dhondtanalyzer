import {Component, OnInit} from '@angular/core';


/**
 * Clase RootComponent. Implementa la funcionalidad de un Componente.
 *
 * RootComponent
 */
@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {


    /**
     * Atributo title.
     *
     * El tipo es string.
     */
    private _title: string;


    /**
     * Constructor de la clase.
     */
    constructor() {
    }


    /**
     * Getter del atributo title.
     *
     * @returns {string}
     */
    get title(): string {
        return this._title;
    }


    /**
     * Setter del atributo title.
     *
     * @param value
     */
    set title(value: string) {
        this._title = value;
    }


    /**
     * Función ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ngOnInit() {
        this.title = 'DHondtAnalyzer'
    }
}

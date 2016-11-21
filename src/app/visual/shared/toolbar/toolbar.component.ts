import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Link} from "../link";


/**
 * Clase ToolbarComponent. Implementa la funcionalidad de un Componente.
 *
 * ToolbarComponent es un componente que muestra la barra superior de la
 * aplicación y se encarga de ofrecer los links que permiten la navegación
 * por el sitio web.
 */
@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


    /**
     * Atributo links.
     *
     * El tipo es Array<Link>.
     */
    private _links: Array<Link>;


    /**
     * Atributo title.
     *
     * El tipo es string.
     *
     * Su visibilidad debe ser protected debido a que es un parámetro de
     * entrada del componente.
     */
    @Input() protected title: string;


    /**
     * Constructor de la clase ToolbarComponent.
     *
     * @param router Servicio Router que permite la redirección hacia otras
     * rutas dentro de la aplicación.
     */
    constructor(private router: Router,) {
    }


    /**
     * Getter del atributo links.
     *
     * @returns {Array<Link>}
     */
    get links(): Array<Link> {
        return this._links;
    }


    /**
     * Setter del atributo links.
     *
     * @param value
     */
    set links(value: Array<Link>) {
        this._links = value;
    }


    /**
     * Funcion ngOnInit.
     *
     * Implementa la función de la interfaz OnInit
     */
    ngOnInit() {
        this.links = [
            new Link('Home', '/app/home'),
            new Link('Elections', '/app/elections'),
            new Link('Parties', '/app/parties'),
            new Link('Exit', '/')
        ]
    }


    /**
     * Función goTo.
     *
     * Redirige al usuario hacia la ruta indicada como parámetro.
     *
     * @param link Link que representa la ruta relativa hacia la cuál se
     * pretende navegar.
     */
    goTo(link: Link): void {
        this.router.navigate([link.url]);
    }

}

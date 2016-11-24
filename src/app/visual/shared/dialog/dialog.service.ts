import {Injectable, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from '@angular/common';

import {MdDialog, MdDialogRef, ComponentType} from "@angular/material";
import {ComponentWithParams} from "../component-with-params";


/**
 * Clase DialogService. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de manejar el control de un diálogo dentro
 * de la web. Desde aquí se crea, se muestra, y se destruye.
 */
@Injectable()
export class DialogService {


    /**
     * Atributo dialogRef.
     *
     * El tipo es MdDialogRef<ComponentWithParams>.
     *
     */
    private dialogRef: MdDialogRef<ComponentWithParams>;


    /**
     * Atributo componentType.
     *
     * El tipo es ComponentType<ComponentWithParams>.
     *
     */
    private componentType: ComponentType<ComponentWithParams>;


    /**
     * Atributo route.
     *
     * El tipo es ActivatedRoute.
     *
     */
    private route: ActivatedRoute;


    /**
     * Atributo viewContainerRef.
     *
     * El tipo es ViewContainerRef.
     *
     */
    private viewContainerRef: ViewContainerRef;


    /**
     * Constructor de la clase.
     *
     * @param dialog
     * @param location
     */
    constructor(private dialog: MdDialog,
                private location: Location) {
    }


    /**
     * Función init.
     *
     * Inicializa los atributos de la clase. Puesto que es un servicio (no se
     * puede asignar atributos desde el constructor que no sean otros servicios
     * genéricos) hay que hacerlo desde una función externa.
     *
     * @param viewContainerRef Referencia al componente en el que se muestra
     * el dialog.
     *
     * @param componentType tipo del componente que esta dentro del dialog.
     *
     * @param route ruta desde la que se extrae el id del objeto a mostrar en
     * el dialog.
     */
    public init(viewContainerRef: ViewContainerRef,
                componentType: ComponentType<ComponentWithParams>,
                route: ActivatedRoute) {
        this.viewContainerRef = viewContainerRef;
        this.componentType = componentType;
        this.route = route;
    }


    /**
     * Función readRoute.
     *
     * Se encarga de "leer" los parámetros de la url y en el caso de que estos
     * existan realiza una llamada a la función openDialog, que muestra el
     * detalle de una eleccion.
     */
    readRoute(): void {
        this.route.params
            .forEach((params: Params) => {
                console.log(params);

                if (params['id'] !== undefined) {
                    this.openDialog(params['id'], true);
                    console.log(params['id']);
                }
            });
    }


    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de un
     * partido político a partir de un diálogo que contiene el contenido del
     * component PartyDetailComponent.
     *
     * @param objectId string que representa el id del objeto a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     */
    openDialog(objectId: string, navigated = false) {


        let basePath = this.location.path();


        this.dialogRef = this.dialog.open(this.componentType, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });


        this.dialogRef.componentInstance.objectId = objectId;
        if (!navigated) {
            this.location.go(basePath + "/" + objectId);
        }

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;

            if (navigated) {
                navigated = false;
                basePath = basePath.split('/' + objectId)[0];
                this.location.go(basePath);
            }
        });

    }
}

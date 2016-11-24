import {Injectable, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';

import {MdDialog, MdDialogRef, ComponentType} from "@angular/material";
import {ComponentWithParams} from "../component-with-params";
import {Model} from "../../../dao/model/model";
import {ObjectFromRoute} from "../router/object-from-route";


/**
 * Clase DialogService. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de manejar el control de un diálogo dentro
 * de la web. Desde aquí se crea, se muestra, y se destruye.
 *
 * Implementa la capacidad de recibir llamadas externas a partir de la ruta.
 */
@Injectable()
export class DialogService implements ObjectFromRoute<Model> {
    objectCallback(object: Model): void {
        this.openDialog(object, true);
    }


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
     */
    public init(viewContainerRef: ViewContainerRef,
                componentType: ComponentType<ComponentWithParams>) {
        this.viewContainerRef = viewContainerRef;
        this.componentType = componentType;
    }


    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de un
     * partido político a partir de un diálogo que contiene el contenido del
     * component PartyDetailComponent.
     *
     * @param model string que representa el id del objeto a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     */
    openDialog(model: Model, navigated = false) {


        let basePath = this.location.path();


        this.dialogRef = this.dialog.open(this.componentType, {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        });


        this.dialogRef.componentInstance.model = model;
        if (!navigated) {
            this.location.go(basePath + "/" + model.key);
        }

        this.dialogRef.afterClosed().subscribe(() => {
            this.location.go(basePath);
            this.dialogRef = null;

            if (navigated) {
                navigated = false;
                basePath = basePath.split('/' + model.key)[0];
                this.location.go(basePath);
            }
        });

    }
}

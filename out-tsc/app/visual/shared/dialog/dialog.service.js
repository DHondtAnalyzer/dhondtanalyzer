var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog } from "@angular/material";
import { JQueryService } from "../jquery.service";
/**
 * Clase DialogService. Implementa la funcionalidad de un Servicio.
 *
 * Este servicio es el encargado de manejar el control de un diálogo dentro
 * de la web. Desde aquí se crea, se muestra, y se destruye.
 *
 * Implementa la capacidad de recibir llamadas externas a partir de la ruta.
 */
export var DialogService = (function () {
    /**
     * Constructor de la clase.
     *
     * @param dialog
     * @param location
     * @param jQueryService
     */
    function DialogService(dialog, location, jQueryService) {
        this.dialog = dialog;
        this.location = location;
        this.jQueryService = jQueryService;
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
    DialogService.prototype.init = function (viewContainerRef, componentType) {
        this.viewContainerRef = viewContainerRef;
        this.componentType = componentType;
    };
    /**
     * Función openDialog.
     *
     * Es la función encargada de mostrar en pantalla el detalle de un
     * partido político a partir de un diálogo que contiene el contenido del
     * component PartyDetailComponent.
     *
     * @param id string que representa el id del objeto a mostrar.
     * @param navigated boolean que indica si se ha hacedido a la url por
     * navegación.
     * @param newModel
     */
    DialogService.prototype.openDialog = function (id, navigated, newModel) {
        var _this = this;
        if (navigated === void 0) { navigated = false; }
        if (newModel === void 0) { newModel = false; }
        var basePath = this.location.path();
        var extensionPath;
        if (navigated) {
            var temp = void 0;
            if (newModel) {
                temp = basePath.split('/new');
            }
            else {
                temp = basePath.split('/' + id);
            }
            basePath = temp[0];
            extensionPath = temp[1];
        }
        else {
            if (newModel) {
                extensionPath = "/new";
            }
            else {
                extensionPath = "/" + id;
            }
        }
        var config = {
            viewContainerRef: this.viewContainerRef,
            role: 'dialog'
        };
        this.dialogRef = this.dialog.open(this.componentType, config);
        this.dialogRef.componentInstance.id = id;
        if (!navigated) {
            this.location.go(basePath + extensionPath);
        }
        this.dialogRef.afterClosed().subscribe(function () {
            _this.location.go(basePath);
            _this.dialogRef = null;
        });
        var cont = this.jQueryService.getElement('md-dialog-container');
        var overlay = this.jQueryService.getElement('.cdk-overlay-pane');
        this.dialogRef.componentInstance.onResize.subscribe(function (isFullScreen) {
            if (isFullScreen) {
                cont.addClass('md-dialog-container-full-size');
                cont.removeClass('md-dialog-container-normal-size');
                overlay.addClass('md-overlay-pane-full-size');
                overlay.removeClass('md-overlay-pane-normal-size');
            }
            else {
                cont.addClass('md-dialog-container-normal-size');
                cont.removeClass('md-dialog-container-full-size');
                overlay.removeClass('md-overlay-pane-full-size');
                overlay.addClass('md-overlay-pane-normal-size');
            }
        });
    };
    DialogService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [MdDialog, Location, JQueryService])
    ], DialogService);
    return DialogService;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/shared/dialog/dialog.service.js.map
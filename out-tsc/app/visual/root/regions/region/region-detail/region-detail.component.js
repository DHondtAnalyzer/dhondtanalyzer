var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Region } from "../../../../../dao/model/region";
import { MdDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { DaoService } from "../../../../../dao/dao.service";
import 'rxjs/add/operator/map';
import { AppListObservableObject } from "../../../../../dao/app-list-observable-object";
export var RegionDetailComponent = (function () {
    /**
     * Constructor de la clase.
     */
    function RegionDetailComponent(dialogRef, daoService, router) {
        this.dialogRef = dialogRef;
        this.daoService = daoService;
        this.router = router;
        this.resizableSubscriber = new BehaviorSubject(false);
        this.onResize = this.resizableSubscriber.asObservable();
    }
    Object.defineProperty(RegionDetailComponent.prototype, "id", {
        /**
         * Getter del atributo id.
         * (Necesario por la interfaz ComponentWithParams)
         *
         * @returns {string}
         */
        get: function () {
            return this._id;
        },
        /**
         * Setter del atributo id
         * (Necesario por la interfaz ComponentWithParams)
         *
         * @param value
         */
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionDetailComponent.prototype, "region", {
        /**
         * Getter del atributo party.
         *
         * Se ha creado para facilitar la comprensión del código refiriendose
         * directamente como un partido y no como un modelo.
         *
         * @returns {Party}
         */
        get: function () {
            return this._model;
        },
        /**
         * Setter del atributo party.
         *
         * Se ha creado para facilitar la comprensión del código refiriendose
         * directamente como un partido y no como un modelo.
         *
         * @returns {Party}
         */
        set: function (value) {
            this._model = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionDetailComponent.prototype, "electionList", {
        get: function () {
            return this._electionList;
        },
        set: function (value) {
            this._electionList = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionDetailComponent.prototype, "onResize", {
        /**
         * Getter del atributo onResize.
         * (necesario por la interfaz DialogComponent)
         *
         * @returns {Observable<boolean>}
         */
        get: function () {
            return this._onResize;
        },
        /**
         * Setter del atributo onResize.
         * (necesario por la interfaz DialogComponent)
         *
         * @param value
         */
        set: function (value) {
            this._onResize = value;
        },
        enumerable: true,
        configurable: true
    });
    RegionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.region = Region.newInstance();
        if (this.id) {
            this.daoService.getRegionObjectObservable(this.id)
                .subscribe(function (item) {
                _this.region = item;
                if (!_this.electionList) {
                    _this.region.districtList.subscribe(function (districtList) {
                        _this.electionList = new AppListObservableObject();
                        districtList.forEach(function (district) {
                            _this.electionList.push(district.election);
                        });
                    });
                }
            });
        }
        else {
            this.editing = true;
        }
    };
    /**
     * Función closeDialog.
     *
     * Es la encargada de cerrar el diálogo.
     */
    RegionDetailComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    RegionDetailComponent.prototype.navigateToElection = function (id) {
        this.closeDialog();
        this.router.navigate(['/app/elections', id]);
    };
    /**
     * Función fabIcon.
     *
     * Es la encargada de manejar el control del icono que se muestra en el
     * botón de edición.
     *
     * @returns {string}
     */
    RegionDetailComponent.prototype.fabIcon = function () {
        if (this.editing) {
            return 'done';
        }
        else {
            return 'edit';
        }
    };
    Object.defineProperty(RegionDetailComponent.prototype, "iconScreenChange", {
        get: function () {
            if (this.isFullScreen) {
                return 'fullscreen_exit';
            }
            else {
                return 'fullscreen';
            }
        },
        enumerable: true,
        configurable: true
    });
    RegionDetailComponent.prototype.screenStateChange = function () {
        this.isFullScreen = !this.isFullScreen;
        this.resizableSubscriber.next(this.isFullScreen);
    };
    /**
       * Función editingChange.
       *
       * Es la función encargada de cambiar el estado de edición a visualización
       * y guardar los datos si fuera necesario.
       */
    RegionDetailComponent.prototype.editingChange = function () {
        if (this.editing) {
            this.saveChanges();
        }
        this.editing = !this.editing;
    };
    /**
     * Función saveChanges.
     *
     * Es la encargada de guardar los datos después de una modificación o creación.
     */
    RegionDetailComponent.prototype.saveChanges = function () {
        var _this = this;
        this.daoService.saveRegion(this.region).then(function () {
            _this.id = _this.region.id;
        }).catch(function (reason) {
            console.error(reason.message);
        });
    };
    /**
     * Función delete.
     *
     * Es la encargada de eliminar la elección de la persistencia de la aplicación.
     */
    RegionDetailComponent.prototype.delete = function () {
        var _this = this;
        this.daoService.deleteRegion(this.region).then(function () {
            _this.closeDialog();
        }).catch(function (reason) {
            console.error(reason.message);
        });
    };
    RegionDetailComponent = __decorate([
        Component({
            selector: 'app-region-detail',
            templateUrl: './region-detail.component.html',
            styleUrls: ['./region-detail.component.css']
        }), 
        __metadata('design:paramtypes', [MdDialogRef, DaoService, Router])
    ], RegionDetailComponent);
    return RegionDetailComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/regions/region/region-detail/region-detail.component.js.map
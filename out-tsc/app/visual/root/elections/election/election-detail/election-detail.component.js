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
import { Election } from "../../../../../dao/model/election";
import { Router } from "@angular/router";
import { MdDialogRef } from "@angular/material";
import { BehaviorSubject } from "rxjs";
import { DaoService } from "../../../../../dao/dao.service";
/**
 * Clase ElectionDetailComponent. Implementa la funcionalidad de un Componente.
 *
 * ElectionDetailComponent se encarga de representar visualmente una elección.
 */
export var ElectionDetailComponent = (function () {
    /**
     * Constructor de la clase.
     */
    function ElectionDetailComponent(dialogRef, daoService, router) {
        this.dialogRef = dialogRef;
        this.daoService = daoService;
        this.router = router;
        this.resizableSubscriber = new BehaviorSubject(false);
        this.onResize = this.resizableSubscriber.asObservable();
    }
    Object.defineProperty(ElectionDetailComponent.prototype, "id", {
        /**
         * Getter del atributo id.
         * (Necesario por la interfaz ComponentWithParams)
         *
         * @returns {Election}
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
    Object.defineProperty(ElectionDetailComponent.prototype, "onResize", {
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
    Object.defineProperty(ElectionDetailComponent.prototype, "election", {
        /**
         * Getter del atributo election.
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
         * Setter del atributo election.
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
    ElectionDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.election = Election.newInstance();
        if (this.id) {
            this.daoService.getElectionObjectObservable(this.id)
                .subscribe(function (election) {
                _this.election = election;
            });
        }
        else {
            this.editing = true;
        }
    };
    Object.defineProperty(ElectionDetailComponent.prototype, "districtList", {
        get: function () {
            return this.election.districtList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElectionDetailComponent.prototype, "partyList", {
        get: function () {
            return this.election.partyList;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Función closeDialog.
     *
     * Es la encargada de cerrar el diálogo.
     */
    ElectionDetailComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    ElectionDetailComponent.prototype.navigateToParty = function (id) {
        this.closeDialog();
        this.router.navigate(['/app/parties', id]);
    };
    ElectionDetailComponent.prototype.addParty = function (id) {
        this.daoService.addPartyToElection(this.election.id, id);
    };
    ElectionDetailComponent.prototype.removeParty = function (id) {
        this.daoService.removePartyFromElection(this.election.id, id);
    };
    ElectionDetailComponent.prototype.addDistrict = function (regionId) {
        this.daoService.addDistrictToElection(this.election.id, regionId);
    };
    ElectionDetailComponent.prototype.removeDistrict = function (districtId) {
        this.daoService.deleteDistrict(districtId);
    };
    /**
     * Función fabIcon.
     *
     * Es la encargada de manejar el control del icono que se muestra en el
     * botón de edición.
     *
     * @returns {string}
     */
    ElectionDetailComponent.prototype.fabIcon = function () {
        if (this.editing) {
            return 'done';
        }
        else {
            return 'edit';
        }
    };
    Object.defineProperty(ElectionDetailComponent.prototype, "iconScreenChange", {
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
    ElectionDetailComponent.prototype.screenStateChange = function () {
        this.isFullScreen = !this.isFullScreen;
        this.resizableSubscriber.next(this.isFullScreen);
    };
    /**
     * Función editingChange.
     *
     * Es la función encargada de cambiar el estado de edición a visualización
     * y guardar los datos si fuera necesario.
     */
    ElectionDetailComponent.prototype.editingChange = function () {
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
    ElectionDetailComponent.prototype.saveChanges = function () {
        var _this = this;
        this.daoService.saveElection(this.election).then(function () {
            _this.id = _this.election.id;
        }).catch(function (reason) {
            console.error(reason.message);
        });
    };
    /**
     * Función delete.
     *
     * Es la encargada de eliminar la elección de la persistencia de la aplicación.
     */
    ElectionDetailComponent.prototype.delete = function () {
        var _this = this;
        this.daoService.deleteElection(this.election).then(function () {
            _this.closeDialog();
        }).catch(function (reason) {
            console.error(reason.message);
        });
    };
    ElectionDetailComponent = __decorate([
        Component({
            selector: 'app-election-detail',
            templateUrl: './election-detail.component.html',
            styleUrls: ['./election-detail.component.css']
        }), 
        __metadata('design:paramtypes', [MdDialogRef, DaoService, Router])
    ], ElectionDetailComponent);
    return ElectionDetailComponent;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/visual/root/elections/election/election-detail/election-detail.component.js.map
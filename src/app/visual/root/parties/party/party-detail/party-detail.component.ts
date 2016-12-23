import {Component, OnInit} from '@angular/core';
import {ComponentWithParams} from "../../../../shared/component-with-params";
import {Party} from "../../../../../dao/model/party";
import {MdDialogRef} from "@angular/material";
import {Router} from "@angular/router";
import {Election} from "../../../../../dao/model/election";
import {DialogComponent} from "../../../../shared/dialog/dialog-component";
import {Observable, BehaviorSubject} from "rxjs";


/**
 * Clase PartyDetailComponent. Implementa la funcionalidad de un Componente.
 *
 * PartyDetailComponent se encarga de representar visualmente un partido político.
 */
@Component({
    selector: 'app-party-detail',
    templateUrl: './party-detail.component.html',
    styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements DialogComponent, OnInit {


    private editing: boolean;

  private isFullScreen: boolean;
  private resizableSubscriber:BehaviorSubject<boolean>;

    /**
     * Atributo model.
     *
     * El tipo es Party.
     */
    private _model: Party;



    /**
     *
     * @type {"../../Observable".Observable<T>}
     * @private
     */
    private _onResize;


    /**
     * Constructor de la clase.
     */
    constructor(private dialogRef: MdDialogRef<PartyDetailComponent>,
                private router: Router) {
      this.resizableSubscriber = new BehaviorSubject<boolean>(false)
      this.onResize = this.resizableSubscriber.asObservable()
    }


    /**
     * Getter del atributo model.
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @returns {string}
     */
    get model(): Party {
        return this._model;
    }


    /**
     * Setter del atributo model
     * (Necesario por la interfaz ComponentWithParams)
     *
     * @param value
     */
    set model(value: Party) {
        this._model = value;
    }


    /**
     * Getter del atributo party.
     *
     * Se ha creado para facilitar la comprensión del código refiriendose
     * directamente como un partido y no como un modelo.
     *
     * @returns {Party}
     */
    get party(): Party {
        return this.model;
    }


    /**
     * Setter del atributo party.
     *
     * Se ha creado para facilitar la comprensión del código refiriendose
     * directamente como un partido y no como un modelo.
     *
     * @returns {Party}
     */
    set party(value: Party) {
        this.model = value;
    }


  /**
   * Getter del atributo onResize.
   * (necesario por la interfaz DialogComponent)
   *
   * @returns {Observable<boolean>}
   */
  get onResize(): Observable<boolean> {
    return this._onResize;
  }


  /**
   * Setter del atributo onResize.
   * (necesario por la interfaz DialogComponent)
   *
   * @param value
   */
  set onResize(value: Observable<boolean>) {
    this._onResize = value;
  }


    ngOnInit(): void {
        if(!this.model.name){
            this.editing = true;
        }
    }


    /**
     * Función closeDialog.
     *
     * Es la encargada de cerrar el diálogo.
     */
    private closeDialog(): void {
        this.dialogRef.close();
    }

    private navigateToElection(election: Election) {
        this.closeDialog();
        this.router.navigate(['/app/elections', election.id]);
    }


    /**
     * Función fabIcon.
     *
     * Es la encargada de manejar el control del icono que se muestra en el
     * botón de edición.
     *
     * @returns {string}
     */
    private fabIcon(): string {
        if (this.editing) {
            return 'done';
        } else {
            return 'edit';
        }
    }

  private get iconScreenChange(){
    if(this.isFullScreen){
      return 'fullscreen_exit';
    } else {
      return 'fullscreen';
    }
  }

  private screenStateChange() {
    this.isFullScreen = !this.isFullScreen;
    this.resizableSubscriber.next(this.isFullScreen);
  }

    /**
     * Función editingChange.
     *
     * Es la función encargada de cambiar el estado de edición a visualización
     * y guardar los datos si fuera necesario.
     */
    private editingChange(): void {
        if (this.editing) {
            this.saveChanges();
        }
        this.editing = !this.editing;
    }


    /**
     * Función saveChanges.
     *
     * Es la encargada de guardar los datos después de una modificación o creación.
     */
    private saveChanges(): void {
        // TODO
    }
}

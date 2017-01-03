import {Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {MdMenuTrigger} from "@angular/material";
import {AppList} from "../../../dao/app-list";
import {AppListObservable} from "../../../dao/app-list-observable";


/**
 *
 *
 *
 * Based on: http://4dev.tech/2016/03/tutorial-creating-an-angular2-autocomplete/
 */
@Component({
    selector: 'app-autocomplete-input',
    templateUrl: './autocomplete-input.component.html',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    styleUrls: ['./autocomplete-input.component.css']
})
export class AutoCompleteInputComponent {


    private query: string = '';

    private filtered: AppListObservable<any>;


    @Input() items: AppListObservable<any>;
    @Input() findAttribute: string = 'name';

    @Input() autoClean?: boolean;
    @Input() placeholder: string;

    @Output() selectedItem = new EventEmitter<string>();


    constructor(private elementRef: ElementRef) {
    }

  filter() {
    this.filtered = <AppListObservable<any>>this.items.map((items) => {
      return items.filter((value) => {
        return value[this.findAttribute].toLowerCase()
            .indexOf(this.query.toLowerCase()) > -1;
      });
    });
  }

  select(item) {
    this.query = item[this.findAttribute];
    this.selectedItem.emit(item.id);

    if (this.autoClean) {
      this.query = '';
    }
    this.filtered = <AppListObservable<any>>this.items.map((items) => {
      return items.filter((value) => false);
    });
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filtered = <AppListObservable<any>>this.items.map((items) => {
        return items.filter((value) => false);
      });
    }
  }

    get inputName() {
        return this.placeholder.replace(/ /g,"-").toLocaleLowerCase()
    }
}

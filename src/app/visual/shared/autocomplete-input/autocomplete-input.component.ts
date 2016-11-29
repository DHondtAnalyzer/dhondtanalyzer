import {Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {MdMenuTrigger} from "@angular/material";


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

    private filtered: any[] = [];


    @Input() items: any[];
    @Input() findAttribute: string = 'name';

    @Input() autoClean?: boolean;
    @Input() placeholder: string;

    @Output() selectedItem = new EventEmitter<Object>();


    constructor(private elementRef: ElementRef) {
    }

    filter() {

        if (this.query !== "") {
            this.filtered = this.items.filter(function (value) {
                return value[this.findAttribute].toLowerCase()
                        .indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filtered = [];
        }
    }

    select(item) {
        this.query = item[this.findAttribute];
        this.selectedItem.emit(item);

        if (this.autoClean) {
            this.query = '';
        }
        this.filtered = [];
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
            this.filtered = [];
        }
    }

    get inputName() {
        return this.placeholder.replace(/ /g,"-").toLocaleLowerCase()
    }
}

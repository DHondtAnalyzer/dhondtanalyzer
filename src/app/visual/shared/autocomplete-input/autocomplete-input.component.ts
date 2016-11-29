import {Component, OnInit, ElementRef} from '@angular/core';


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
export class AutocompleteInputComponent {


    public query = '';
    public countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus",
        "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus",
        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
        "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo",
        "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta",
        "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland",
        "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
        "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];
    public filteredList = [];
    public elementRef;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    filter() {
        if (this.query !== "") {
            this.filteredList = this.countries.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
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
            this.filteredList = [];
        }
    }

}

import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Model} from "../../../dao/model/model";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {

    private query: string = '';

    @Input() placeholder: string = 'Search...';
    @Input() initialList: Model[];

    @Output() onSearch = new EventEmitter<Model[]>();

    constructor() {
    }


    filter(): void {
        let filteredList;
        if (this.query) {
            filteredList = this.initialList.filter(function (value) {
                return value.name.toLowerCase()
                        .indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            filteredList = this.initialList;
        }
        this.onSearch.emit(filteredList);
    }

}

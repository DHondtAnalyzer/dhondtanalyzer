import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {Model} from "../../../dao/model/model";
import {AppListObservable} from "../../../dao/app-list-observable";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


    private query: string = '';

    @Input() placeholder: string = 'Search...';
  @Input() initialList: AppListObservable<Model[]>;

  @Output() onSearch = new EventEmitter<AppListObservable<Model[]>>();

    constructor() {
    }

  ngOnInit(): void {
  }

  filter(): void {
    let filteredList;
    if (this.query) {
      filteredList = this.initialList.map(list => {
        return list.filter((value) =>
          value.name.toLowerCase()
            .indexOf(this.query.toLowerCase()) > -1
        );
      });
    } else {
      filteredList = this.initialList;
    }
    this.onSearch.emit(filteredList);
  }
}

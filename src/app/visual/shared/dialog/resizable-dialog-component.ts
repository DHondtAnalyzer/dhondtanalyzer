import {Component} from "@angular/core";
import {Observable} from "rxjs";


/**
 *
 */
export interface ResizableDialogComponent extends Component {
  onResize: Observable<boolean>;
}

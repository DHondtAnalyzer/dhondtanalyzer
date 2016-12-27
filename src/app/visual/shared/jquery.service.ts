import {Injectable} from '@angular/core';
import * as jQuery from 'jquery';



@Injectable()
export class JQueryService {


  constructor() {
  }

  getElement(identifier: string): any {
    return jQuery(identifier);
  }

}

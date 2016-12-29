import {AppObjectObservable} from "./app-object-observable";
import {BehaviorSubject, Subscription} from "rxjs";


/**
 * Created by garciparedes on 29/12/2016.
 */
export class AppListObservableObject<T>{

  private observableList: Array<AppObjectObservable<T>>;
  private itemList: Array<T>;


  private subscriber: BehaviorSubject<Array<T>>;


  constructor() {
    this.subscriber = new BehaviorSubject<Array<T>>([]);
    this.subscriber.asObservable();
    this.observableList = [];
    this.itemList = [];
  }

  subscribe(next?: (value: T[]) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.subscriber.asObservable().subscribe(next, error, complete);
  }


  push(item) {
    this.observableList.push(item);
    item.subscribe(i => {
      this.itemList.push(i);
      this.subscriber.next(this.itemList);
    });
  }
}

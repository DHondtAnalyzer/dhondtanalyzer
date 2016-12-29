import {AppObjectObservable} from "./app-object-observable";
import {BehaviorSubject, Subscription} from "rxjs";
import 'rxjs/add/operator/map';


/**
 * Created by garciparedes on 29/12/2016.
 */
export class AppListObservableObject<T> {

  private observableList: AppObjectObservable<T>[];
  private itemList: Array<T>;


  private subscriber: BehaviorSubject<Array<T>>;


  constructor(observableList: AppObjectObservable<T>[] = []) {

    this.subscriber = new BehaviorSubject<Array<T>>([]);
    this.subscriber.asObservable();
    this.observableList = observableList;
    this.itemList = [];

    this.observableList.forEach(obs => {
      obs.subscribe(i => {
        this.itemList.push(i);
        this.subscriber.next(this.itemList);
      })
    });
    this.subscriber.next(this.itemList);
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

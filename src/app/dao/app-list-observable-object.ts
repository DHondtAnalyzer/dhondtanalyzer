import {AppObjectObservable} from "./app-object-observable";
import {BehaviorSubject, Subscription, Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {Model} from "./model/model";


/**
 * Created by garciparedes on 29/12/2016.
 */
export class AppListObservableObject<T extends Model> {

  private observableList: AppObjectObservable<T>[];
  private itemList: Array<T>;


  private subscriber: BehaviorSubject<Array<T>>;


  constructor(observableList: AppObjectObservable<T>[] = []) {

    this.subscriber = new BehaviorSubject<Array<T>>([]);
    this.subscriber.asObservable();
    this.observableList = observableList;
    this.itemList = [];

    this.observableList.forEach(obs => {
      obs.subscribe(item => {
          this.itemList.push(item);
          this.subscriber.next(this.itemList);
      })
    });
    this.subscriber.next(this.itemList);
  }




  subscribe(next?: (value: T[]) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.subscriber.asObservable().subscribe(next, error, complete);
  }




  filter(callbackfn: (value: AppObjectObservable<T>, index: number,
                      array: AppObjectObservable<T>[]) => any,
         thisArg?: any): AppListObservableObject<T> {
    return new AppListObservableObject<T>(this.observableList.filter(callbackfn, thisArg));
  }

  /*
  map<T, R>(this: Observable<T>, project: (value: T, index: number) => R, thisArg?: any): Observable<R> {
  }
  */

  plainList(): any {
    let plainList = {};
    for (let i = 0; i < this.itemList.length; ++i)
      plainList[this.itemList[i].id] = true;
    return plainList;
  }



  isEmpty(): boolean {
    return !(this.observableList.length > 0);
  }


  push(obs: AppObjectObservable<T>) {
    this.observableList.push(obs);
    obs.subscribe(i => {
      this.itemList.push(i);
      this.subscriber.next(this.itemList);

    });

  }
}

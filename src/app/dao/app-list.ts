/**
 * Created by garciparedes on 29/12/2016.
 */
import {AppListObservable} from "./app-list-observable";
import {AppListObservableObject} from "./app-list-observable-object";
import {Model} from "./model/model";

export declare type AppList<T extends Model> = AppListObservable<T[]> | AppListObservableObject<T>;



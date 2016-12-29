/**
 * Created by garciparedes on 29/12/2016.
 */
import {AppListObservable} from "./app-list-observable";
import {AppListObservableObject} from "./app-list-observable-object";

export declare type AppList<T> = AppListObservable<T[]> | AppListObservableObject<T>;



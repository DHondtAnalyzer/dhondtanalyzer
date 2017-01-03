import { BehaviorSubject } from "rxjs";
import 'rxjs/add/operator/map';
/**
 * Created by garciparedes on 29/12/2016.
 */
export var AppListObservableObject = (function () {
    function AppListObservableObject(observableList) {
        var _this = this;
        if (observableList === void 0) { observableList = []; }
        this.subscriber = new BehaviorSubject([]);
        this.subscriber.asObservable();
        this.observableList = observableList;
        this.itemList = [];
        this.observableList.forEach(function (obs) {
            obs.subscribe(function (item) {
                _this.itemList.push(item);
                _this.subscriber.next(_this.itemList);
            });
        });
        this.subscriber.next(this.itemList);
    }
    AppListObservableObject.prototype.subscribe = function (next, error, complete) {
        return this.subscriber.asObservable().subscribe(next, error, complete);
    };
    AppListObservableObject.prototype.filter = function (callbackfn, thisArg) {
        return new AppListObservableObject(this.observableList.filter(callbackfn, thisArg));
    };
    /*
    map<T, R>(this: Observable<T>, project: (value: T, index: number) => R, thisArg?: any): Observable<R> {
    }
    */
    AppListObservableObject.prototype.plainList = function () {
        var plainList = {};
        for (var i = 0; i < this.itemList.length; ++i)
            plainList[this.itemList[i].id] = true;
        return plainList;
    };
    AppListObservableObject.prototype.isEmpty = function () {
        return !(this.observableList.length > 0);
    };
    AppListObservableObject.prototype.push = function (obs) {
        var _this = this;
        var subs = obs.subscribe(function (item) {
            var flag = false;
            for (var i = 0; i < _this.itemList.length; i++) {
                if (_this.itemList[i].id == item.id) {
                    flag = true;
                }
            }
            if (flag) {
                subs.unsubscribe();
            }
            else {
                _this.itemList.push(item);
                _this.observableList.push(obs);
                _this.subscriber.next(_this.itemList);
            }
        });
    };
    return AppListObservableObject;
}());
//# sourceMappingURL=/Users/garciparedes/development/--dhondtanalyzer/dhondtanalyzer/src/app/dao/app-list-observable-object.js.map
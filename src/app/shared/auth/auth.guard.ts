/**
 * Created by garciparedes on 16/11/2016.
 */

import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(): boolean {

        return true;
    }
}

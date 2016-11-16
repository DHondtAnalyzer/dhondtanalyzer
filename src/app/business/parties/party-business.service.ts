/**
 * Created by garciparedes on 15/11/2016.
 */

import {Injectable} from "@angular/core";
import {PartyDataService} from "../../data/parties/party-data.service";
import {Party} from "../../data/parties/party";

@Injectable()
export class PartyBusinessService {

    constructor(
        private partyDataService:PartyDataService
    ) { }


    getParties(): Party[] {
        return this.partyDataService.getParties();
    }
}

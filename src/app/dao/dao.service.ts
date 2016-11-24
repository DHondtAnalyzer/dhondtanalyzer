import {Injectable} from '@angular/core';
import {Election} from "./model/election";
import {Party} from "./model/party";
import {Region} from "./model/region";
import {ElectionType} from "./model/election-type";
import {District} from "./model/district";

@Injectable()
export class DaoService {


    private _partyList: Party[];
    private _electionList: Election[];
    private _regionList: Region[];

    constructor() {
        this._partyList = [
            new Party("Partido Popular", "PP", "azul"),
            new Party("Partido Socialista", "PSOE", "rojo"),
            new Party("Podemos", "P", "morado"),
            new Party("Ciudadanos", "C", "naranja"),
        ];

        this.partyList[0].key = "hola";
        this.partyList[1].key = "hola";
        this.partyList[2].key = "hola";
        this.partyList[3].key = "hola";

        this._regionList = [
            new Region("Madrid"),
            new Region("Barcelona"),
            new Region("Castilla y León"),
            new Region("Andalucia"),
        ];

        this._electionList = [
            new Election(
                "generales 2016",
                new Date("2016"),
                250,
                ElectionType.GENERALES,
                [
                    new District(this._regionList[0], 21, 3123123),
                    new District(this._regionList[1], 21, 3123123),
                    new District(this._regionList[2], 21, 3123123),
                    new District(this._regionList[3], 21, 3123123),
                ],
                [
                    this._partyList[0],
                    this._partyList[1],
                    this._partyList[2],
                    this._partyList[3],
                ]
            )
        ];
    }

    get electionList(): Election[] {
        return this._electionList;
    }

    set electionList(value: Election[]) {
        this._electionList = value;
    }


    get partyList(): Party[] {
        return this._partyList;
    }
    set partyList(value: Party[]) {
        this._partyList = value;
    }


    get regionList(): Region[] {
        return this._regionList;
    }

    set regionList(value: Region[]) {
        this._regionList = value;
    }
}

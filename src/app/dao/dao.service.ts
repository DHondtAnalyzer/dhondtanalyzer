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
        this.partyList = [
            new Party("Partido Popular", "PP", "azul"),
            new Party("Partido Socialista", "PSOE", "rojo"),
            new Party("Podemos", "P", "morado"),
            new Party("Ciudadanos", "C", "naranja"),
        ];

        this.partyList[0].id = "partido-popular";
        this.partyList[1].id = "partido-socialista";
        this.partyList[2].id = "podemos";
        this.partyList[3].id = "ciudadanos";

        this.regionList = [
            new Region("Madrid"),
            new Region("Barcelona"),
            new Region("Castilla y León"),
            new Region("Andalucia"),
        ];

        this.electionList = [
            new Election(
                "generales 2016",
                new Date("2016"),
                250,
                ElectionType.GENERALES,
                [
                    new District(this.regionList[0], 21, 3123123),
                    new District(this.regionList[1], 21, 3123123),
                    new District(this.regionList[2], 21, 3123123),
                    new District(this.regionList[3], 21, 3123123),
                ],
                [
                    this.partyList[0],
                    this.partyList[1],
                    this.partyList[2],
                    this.partyList[3],
                ]
            )
        ];
        this._electionList[0].id = "generales-2016";


        this.partyList[0].electionList.push(this.electionList[0]);
        this.partyList[1].electionList.push(this.electionList[0]);
        this.partyList[2].electionList.push(this.electionList[0]);
        this.partyList[3].electionList.push(this.electionList[0]);
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

    getElectionById(id: string): Election {
        for(let i:number = 0; i <this.electionList.length; i++){
            if (this.electionList[i].id == id){
                return this.electionList[i];
            }
        }
        return null;
    }

    getPartyById(id: string): Party {
        for(let i:number = 0; i < this.partyList.length; i++){
            if (this.partyList[i].id == id){
                return this.partyList[i];
            }
        }
        return null;
    }
}

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
            Party.newInstance("Partido Popular", "PP", "azul"),
            Party.newInstance("Partido Socialista", "PSOE", "rojo"),
            Party.newInstance("Podemos", "P", "morado"),
            Party.newInstance("Ciudadanos", "C", "naranja"),
        ];

        this.partyList[0].id = "partido-popular";
        this.partyList[1].id = "partido-socialista";
        this.partyList[2].id = "podemos";
        this.partyList[3].id = "ciudadanos";

        this.regionList = [
            Region.newInstance("Madrid"),
            Region.newInstance("Barcelona"),
            Region.newInstance("Castilla y León"),
            Region.newInstance("Andalucia"),
        ];

        this.regionList[0].id = 'madrid';
        this.regionList[1].id = 'barcelona';
        this.regionList[2].id = 'castilla-y-leon';
        this.regionList[3].id = 'andalucia';

        this.electionList = [
            Election.newInstance(
                "generales 2016",
                new Date("2016"),
                250,
                ElectionType.GENERALES,
                [
                    District.newInstance(this.regionList[0], 21, 3123123),
                    District.newInstance(this.regionList[1], 21, 3123123),
                    District.newInstance(this.regionList[2], 21, 3123123),
                    District.newInstance(this.regionList[3], 21, 3123123),
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

    getRegionById(id: string): Region {
        for(let i:number = 0; i < this.regionList.length; i++){
            if (this.regionList[i].id == id){
                return this.regionList[i];
            }
        }
        return null;
    }
}

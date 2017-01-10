import {
  Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChange, SimpleChanges,
  OnDestroy
} from '@angular/core';
import {Election} from "../../../../../dao/model/election";
import {Party} from "../../../../../dao/model/party";
import {District} from "../../../../../dao/model/district";
import {VoteCount} from "../../../../../dao/model/vote-count";
import {DaoService} from "../../../../../dao/dao.service";
import {Subscription} from "rxjs";
import {VoteType} from "../../../../../dao/model/vote-type";
import {AppObjectObservable} from "../../../../../dao/shared/app-object-observable";

@Component({
  selector: 'app-vote-count-table',
  templateUrl: './vote-count-table.component.html',
  styleUrls: ['./vote-count-table.component.css']
})
export class VoteCountTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() election: Election;

  private districts: District[];
  private parties: Party[];
  private voteCounts={};

  private _rows: any[];
  private _columns: any[];
  private _loadingIndicator: boolean;
  private editing = {};
  private values = {};
  private _voteCountRows: any[];
  private _partiesColumns: any[];
  private districtsSub: Subscription;
  private partiesSub: Subscription;

  constructor(private daoService: DaoService, private cd: ChangeDetectorRef) {
    setTimeout(() => { this.loadingIndicator = false; }, 5000);
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.fetchElection();
  }

  ngOnChanges(changes: SimpleChanges) {
    if('election' in changes)
      if(changes['election'].currentValue)
        this.fetchElection();
  }

  ngOnDestroy() {
    if(this.districtsSub)
      this.districtsSub.unsubscribe();
    if(this.partiesSub)
      this.partiesSub.unsubscribe();
  }

  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {
    this._rows = value;
  }
  get columns(): any[] {
    return this._columns;
  }

  set columns(value: any[]) {
    this._columns = value;
  }

  get loadingIndicator(): boolean {
    return this._loadingIndicator;
  }

  private fetchElection() {
    if(this.election.districtList)
      this.districtsSub = this.election.districtList.subscribe(districts => {
        this.districts = districts;
        this.fetchData();
      });

    if(this.election.partyList)
      this.partiesSub = this.election.partyList.subscribe(parties => {
        this.parties = parties;
        this.fetchData();
      })
  }

  private fetchData(){
    if(!this.parties || !this.districts)
      return;
    this._voteCountRows = [];
    this._partiesColumns = [{name: 'Distrito'}];
    this._partiesColumns = this._partiesColumns.concat(this.parties.map(party => {
      return {name: party.abbreviation};
    }));
    this._partiesColumns = this._partiesColumns.concat([{name:'Votos en blanco'}, {name:'Votos nulos'}]);

    this.districts.forEach((district, index) => {
      let voteCount: any[];
      voteCount = [district.id];
      voteCount['name'] = district.id;
      for(let party of this.parties)
        voteCount.push(0);
      this._voteCountRows.push(voteCount);
    });

    this._rows = this._voteCountRows;
    this._columns = this._partiesColumns;

    let self = this;
    this.districts.forEach((district, index) => {
      district.region.subscribe(region => {
        this._rows[index][0] = region.name;
      });
      district.voteCountList.subscribe(voteCountList => {
        voteCountList.forEach(voteCount => {
          if(voteCount.party){
            let party: Party;
            for(let id in voteCount.party){
              try{
                party = this.daoService.getPartyById(id);
              } catch (e) {
                console.error(e);
              }
            }
            if(party)
              for(let partyIndex in this.parties){
                if(this.parties[partyIndex].id === party.id){
                  self.voteCounts[index+':'+partyIndex] = voteCount;
                  self._rows[index][+partyIndex+1] = voteCount.count || 0;
                }
              }

          } else if(voteCount.type === VoteType.BLANK) {
            let lastIndex = self._columns.length - 1;
            let blankVotesIndex = lastIndex - 1;
            self.voteCounts[index+':'+blankVotesIndex] = voteCount;
            self._rows[index][+blankVotesIndex] = voteCount.count || 0;
          } else if(voteCount.type === VoteType.NULL) {
            let nullVotesIndex = self._columns.length -1;
            self.voteCounts[index+':'+nullVotesIndex] = voteCount;
            self._rows[index][+nullVotesIndex] = voteCount.count || 0;
          }
        });
      });
    });
  }

  set loadingIndicator(value: boolean) {
    this._loadingIndicator = value;
  }

  setCellUpdateEnv(i, j, value){
    this.editing[i+':'+j] = true;
    this.values[i+':'+j] = value;
    this.cd.markForCheck();
  }

  updateValue(districtIndex, partyIndex, value) {
    this.updateVoteCount(districtIndex, partyIndex, value);
    this.updateSeats(districtIndex);
  }

  private updateSeats(districtIndex: number){
    let self = this;
    var lastIndex = this._columns.length; //careful, null and blanks does not count
    var district = this.districts[districtIndex];
    let totalSeats = district.seats;
    let voteCounts = this._rows[districtIndex].slice();
    let seats =  Array(lastIndex-3).fill(0);
    for(let n=1; n < lastIndex;n++)
      voteCounts[n]=parseInt(voteCounts[n]);
    console.log(voteCounts);
    let validVotes = 0; // for this district
    for(let n = 1; n < lastIndex-1; n++) // null votes are not valid
      validVotes += voteCounts[n];
    if((validVotes + voteCounts[lastIndex-1]) <= district.census) {
      let minVotes = validVotes * 3 / 100; // TODO: this should be a preference of the election (3%)
      for (let n = 0; n < totalSeats; n++) {
        let max = 0;
        let maxIndex = 0;
        for (let i = 1; i < lastIndex-2; i++) {
          if (voteCounts[i] > minVotes && Math.trunc(voteCounts[i] / (1 + seats[i-1])) > max) {
            maxIndex = i;
            max = Math.trunc(voteCounts[i] / (1 + seats[i-1]));
          }
        }
        seats[maxIndex-1] = seats[maxIndex-1] + 1;
      }
    }
    else{
      //TODO: warn user about this error
      console.log("Error");
    }
    console.log(seats);
  }

  private updateVoteCount(districtIndex: number, partyIndex: number, newCount: any){
    let voteCount = <VoteCount>this.voteCounts[districtIndex+':'+partyIndex];
    console.log(voteCount);
    if(voteCount){
      let lastCount = voteCount.count;
      voteCount.count = +newCount;
      if(!voteCount.party)
        voteCount.party = null;
      this.daoService.saveVoteCount(voteCount).then(_ => {
        this.editing[districtIndex+':'+partyIndex] = false;
        this.rows[districtIndex][partyIndex+1] = newCount;
        delete this.values[districtIndex+':'+partyIndex];
        this.cd.markForCheck();
      }).catch(value => {
        voteCount.count = lastCount;
        this.editing[districtIndex+':'+partyIndex] = false;
        delete this.values[districtIndex+':'+partyIndex];
        this.cd.markForCheck();
        console.error('error', value);
      });
    } else {
      let type: VoteType;
      let party: Party;
      if(partyIndex+1 === this._partiesColumns.length-2){
        type = VoteType.BLANK;
        party = null;
      }
      else if(partyIndex+1 === this._partiesColumns.length-1){
        type = VoteType.NULL;
        party = null;
      }
      else {
        type = VoteType.VALID;
        party = this._partiesColumns[partyIndex];
      }
      //TODO: save new VoteCount
      this.editing[districtIndex+':'+partyIndex] = false;
      delete this.values[districtIndex+':'+partyIndex];
    }
  }

}

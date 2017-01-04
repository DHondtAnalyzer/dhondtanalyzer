/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VoteCountDistrictsRankingListComponent } from './vote-count-districts-ranking-list.component';

describe('VoteCountDistrictsRankingListComponent', () => {
  let component: VoteCountDistrictsRankingListComponent;
  let fixture: ComponentFixture<VoteCountDistrictsRankingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCountDistrictsRankingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCountDistrictsRankingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

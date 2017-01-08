/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VoteCountPartiesRankingListComponent } from './vote-count-parties-ranking-list.component';

describe('VoteCountPartiesRankingListComponent', () => {
  let component: VoteCountPartiesRankingListComponent;
  let fixture: ComponentFixture<VoteCountPartiesRankingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCountPartiesRankingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCountPartiesRankingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

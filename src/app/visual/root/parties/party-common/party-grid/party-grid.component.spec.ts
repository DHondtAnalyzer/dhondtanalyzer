/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PartyGridComponent } from './party-grid.component';

describe('PartyGridComponent', () => {
  let component: PartyGridComponent;
  let fixture: ComponentFixture<PartyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

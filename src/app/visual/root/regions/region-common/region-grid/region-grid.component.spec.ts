/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegionGridComponent } from './region-grid.component';

describe('RegionGridComponent', () => {
  let component: RegionGridComponent;
  let fixture: ComponentFixture<RegionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

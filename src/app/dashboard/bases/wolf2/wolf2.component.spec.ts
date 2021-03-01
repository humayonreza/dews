import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wolf2Component } from './wolf2.component';

describe('Wolf2Component', () => {
  let component: Wolf2Component;
  let fixture: ComponentFixture<Wolf2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wolf2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wolf2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

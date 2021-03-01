import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wolf3Component } from './wolf3.component';

describe('Wolf3Component', () => {
  let component: Wolf3Component;
  let fixture: ComponentFixture<Wolf3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wolf3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wolf3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

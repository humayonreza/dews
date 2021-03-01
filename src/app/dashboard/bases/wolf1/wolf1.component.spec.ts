import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wolf1Component } from './wolf1.component';

describe('Wolf1Component', () => {
  let component: Wolf1Component;
  let fixture: ComponentFixture<Wolf1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wolf1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wolf1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

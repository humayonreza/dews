import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportradaroprComponent } from './reportradaropr.component';

describe('ReportradaroprComponent', () => {
  let component: ReportradaroprComponent;
  let fixture: ComponentFixture<ReportradaroprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportradaroprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportradaroprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

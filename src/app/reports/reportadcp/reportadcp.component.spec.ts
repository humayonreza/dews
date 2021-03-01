import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportadcpComponent } from './reportadcp.component';

describe('ReportadcpComponent', () => {
  let component: ReportadcpComponent;
  let fixture: ComponentFixture<ReportadcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportadcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportadcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

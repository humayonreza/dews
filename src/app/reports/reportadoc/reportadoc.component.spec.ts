import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportadocComponent } from './reportadoc.component';

describe('ReportadocComponent', () => {
  let component: ReportadocComponent;
  let fixture: ComponentFixture<ReportadocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportadocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportadocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

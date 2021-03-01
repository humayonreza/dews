import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdocComponent } from './adoc.component';

describe('AdocComponent', () => {
  let component: AdocComponent;
  let fixture: ComponentFixture<AdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcpComponent } from './adcp.component';

describe('AdcpComponent', () => {
  let component: AdcpComponent;
  let fixture: ComponentFixture<AdcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

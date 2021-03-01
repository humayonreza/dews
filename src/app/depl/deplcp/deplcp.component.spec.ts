import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplcpComponent } from './deplcp.component';

describe('DeplcpComponent', () => {
  let component: DeplcpComponent;
  let fixture: ComponentFixture<DeplcpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeplcpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeplcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

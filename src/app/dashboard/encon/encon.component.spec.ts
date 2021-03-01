import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnconComponent } from './encon.component';

describe('EnairconComponent', () => {
  let component: EnconComponent;
  let fixture: ComponentFixture<EnconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

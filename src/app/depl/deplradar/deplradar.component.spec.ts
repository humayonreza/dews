import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplradarComponent } from './deplradar.component';

describe('DeplradarComponent', () => {
  let component: DeplradarComponent;
  let fixture: ComponentFixture<DeplradarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeplradarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeplradarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

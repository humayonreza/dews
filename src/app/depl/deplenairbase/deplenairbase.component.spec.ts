import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplenairbaseComponent } from './deplenairbase.component';

describe('DeplenairbaseComponent', () => {
  let component: DeplenairbaseComponent;
  let fixture: ComponentFixture<DeplenairbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeplenairbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeplenairbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

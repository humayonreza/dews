import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportenairconComponent } from './reportenaircon.component';

describe('ReportenairconComponent', () => {
  let component: ReportenairconComponent;
  let fixture: ComponentFixture<ReportenairconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportenairconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportenairconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

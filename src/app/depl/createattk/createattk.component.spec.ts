import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateattkComponent } from './createattk.component';

describe('CreateattkComponent', () => {
  let component: CreateattkComponent;
  let fixture: ComponentFixture<CreateattkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateattkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateattkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

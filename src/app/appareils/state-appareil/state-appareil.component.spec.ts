import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAppareilComponent } from './state-appareil.component';

describe('StateAppareilComponent', () => {
  let component: StateAppareilComponent;
  let fixture: ComponentFixture<StateAppareilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateAppareilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAppareilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

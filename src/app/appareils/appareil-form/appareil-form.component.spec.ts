import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilFormComponent } from './appareil-form.component';

describe('AppareilFormComponent', () => {
  let component: AppareilFormComponent;
  let fixture: ComponentFixture<AppareilFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

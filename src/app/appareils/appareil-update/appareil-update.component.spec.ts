import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppareilUpdateComponent } from './appareil-update.component';

describe('AppareilUpdateComponent', () => {
  let component: AppareilUpdateComponent;
  let fixture: ComponentFixture<AppareilUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppareilUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppareilUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

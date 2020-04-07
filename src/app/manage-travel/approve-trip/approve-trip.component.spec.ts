import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTripComponent } from './approve-trip.component';

describe('ApproveTripComponent', () => {
  let component: ApproveTripComponent;
  let fixture: ComponentFixture<ApproveTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

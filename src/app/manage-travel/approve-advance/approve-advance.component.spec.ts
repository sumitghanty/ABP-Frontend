import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAdvanceComponent } from './approve-advance.component';

describe('ApproveAdvanceComponent', () => {
  let component: ApproveAdvanceComponent;
  let fixture: ComponentFixture<ApproveAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

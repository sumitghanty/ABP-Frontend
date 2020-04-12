import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerModalComponent } from './traveller-modal.component';

describe('TravellerModalComponent', () => {
  let component: TravellerModalComponent;
  let fixture: ComponentFixture<TravellerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

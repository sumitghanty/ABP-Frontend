import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelNavComponent } from './travel-nav.component';

describe('TravelNavComponent', () => {
  let component: TravelNavComponent;
  let fixture: ComponentFixture<TravelNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

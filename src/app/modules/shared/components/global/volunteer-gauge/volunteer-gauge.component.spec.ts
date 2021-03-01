import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VolunteerGaugeComponent } from './volunteer-gauge.component';

describe('VolunteerGaugeComponent', () => {
  let component: VolunteerGaugeComponent;
  let fixture: ComponentFixture<VolunteerGaugeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

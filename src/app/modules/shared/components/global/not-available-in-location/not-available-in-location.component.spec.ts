import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableInLocationComponent } from './not-available-in-location.component';

describe('NotAvailableInLocationComponent', () => {
  let component: NotAvailableInLocationComponent;
  let fixture: ComponentFixture<NotAvailableInLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotAvailableInLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAvailableInLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

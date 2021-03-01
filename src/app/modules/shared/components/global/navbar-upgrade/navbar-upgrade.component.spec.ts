import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarUpgradeComponent } from './navbar-upgrade.component';

describe('NavbarUpgradeComponent', () => {
  let component: NavbarUpgradeComponent;
  let fixture: ComponentFixture<NavbarUpgradeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUpgradeComponent } from './navbar-upgrade.component';

describe('NavbarUpgradeComponent', () => {
  let component: NavbarUpgradeComponent;
  let fixture: ComponentFixture<NavbarUpgradeComponent>;

  beforeEach(async(() => {
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

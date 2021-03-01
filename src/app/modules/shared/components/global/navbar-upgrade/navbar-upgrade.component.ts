import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-upgrade',
  templateUrl: './navbar-upgrade.component.html',
  styleUrls: ['./navbar-upgrade.component.scss']
})
export class NavbarUpgradeComponent implements OnInit {

  @Input() daysLeft = 0;
  @Output() upgrade = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpgradeClick() {
    this.upgrade.emit();
  }
}

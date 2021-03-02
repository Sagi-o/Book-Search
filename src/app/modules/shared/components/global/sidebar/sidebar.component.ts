import { Component, OnInit, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarState } from 'src/app/store/sidebar';
import { SidebarItem } from 'src/app/store/sidebar/sidebar-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() title;
  @Input() items = [];
  @Input() selected;

  @Output() clicked = new EventEmitter<SidebarItem>();

  isSidebarSticky = false;

  // Needed to make sidebar sticky based on navbar height
  navbarHeightRem = 4;
  remUnitPx = 14;

  isMobile = window.orientation > -1;

  constructor() { }

  ngOnInit(): void {
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const pixelsFromTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   if (pixelsFromTop > this.navbarHeightRem * this.remUnitPx) {
  //     this.isSidebarSticky = true;
  //   } else {
  //     this.isSidebarSticky = false;
  //   }
  // }

  onItemClick(item: SidebarItem) {
    this.clicked.emit(item);
  }

  originalOrder(a, b) {
    return 0;
  }
}

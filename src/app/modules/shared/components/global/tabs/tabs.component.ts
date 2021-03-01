import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TabItem } from './tab-item.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() items: TabItem[];
  @Input() selectedValue = '';
  @Output() selected = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    // this.selectedValue = this.items ? this.items[0].value : '';
  }

  onTabClick($event) {
    this.selectedValue = $event;
    this.selected.emit($event);
  }
}

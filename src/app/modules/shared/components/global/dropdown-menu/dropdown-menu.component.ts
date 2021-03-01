import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListItem } from '../../../models/list-item.model';
import { dropdownAnimation } from '../../../animations/list.animations';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  animations: [dropdownAnimation]
})
export class DropdownMenuComponent implements OnInit {
  @Input() items: ListItem[];
  @Input() key: any;
  @Output() clicked = new EventEmitter<any>();

  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(item: ListItem) {
    this.collapse();
    console.log('Item choose:', item);
    this.clicked.emit({ key: this.key, value: item.value });
  }

  onOptionClick(item: ListItem, option: ListItem) {
    this.collapse();
    console.log('Option choose:', item, option);
    this.clicked.emit({ key: this.key, value: item.value, target: option.value });
  }

  onClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  collapse() {
    this.isCollapsed = true;
  }
}

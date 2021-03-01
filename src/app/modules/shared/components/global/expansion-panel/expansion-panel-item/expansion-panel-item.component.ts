import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expansion-panel-item',
  templateUrl: './expansion-panel-item.component.html',
  styleUrls: ['./expansion-panel-item.component.scss']
})
export class ExpansionPanelItemComponent implements OnInit {

  @Input() title = 'Sample title';
  @Input() description = 'Sample description';

  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  onBarClick() {
    this.collapsed = !this.collapsed;
  }

}

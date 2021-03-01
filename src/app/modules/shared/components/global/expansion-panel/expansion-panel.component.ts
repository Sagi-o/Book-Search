import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { ExpansionPanelItemComponent } from './expansion-panel-item/expansion-panel-item.component';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @ContentChildren(ExpansionPanelItemComponent) expansionPanelItemComponents: QueryList<ExpansionPanelItemComponent>;

  constructor() { }

  ngOnInit(): void {
  }
}

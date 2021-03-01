import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  @Input() isVisible = false;

  constructor() { }

  ngOnInit(): void {
  }
}

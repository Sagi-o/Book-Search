import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
  @ViewChild('line', { read: ElementRef, static: true }) line: ElementRef;

  // tslint:disable-next-line:variable-name
  _current = 1;
  // tslint:disable-next-line:variable-name
  _total = 1;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  @Input() set current(value: number) {
    this._current = value;
    this.renderer.setStyle(this.line.nativeElement, 'width', `${(this._current / this._total) * 100}%`);
  }

  @Input() set total(value: number) {
    this._total = value;
    this.renderer.setStyle(this.line.nativeElement, 'width', `${(this._current / this._total) * 100}%`);
  }
}

import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input, Output, EventEmitter, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent implements OnInit, AfterViewInit {
  @ViewChild('ratingText', { read: ElementRef, static: true }) ratingText: ElementRef;
  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  @ViewChildren('star') stars: QueryList<any>;

  @Input() readOnly = false;
  @Input() rating = 0;
  @Input() votes: number;
  @Input() size = '1.3rem';
  @Input() hideRating = true;
  @Output() clicked: EventEmitter<number> = new EventEmitter();

  starsArray: any[];

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    if (this.readOnly) {
      this.renderer.setStyle(this.container.nativeElement, 'pointer-events', 'none');
    }
  }

  ngAfterViewInit() {
    this.starsArray = this.stars.toArray();
    this.initStyles();
  }

  initStyles() {
    this.renderer.setStyle(this.container.nativeElement, 'font-size', this.size);
    this.renderer.setStyle(this.ratingText.nativeElement, 'line-height', this.size);

    if (this.hideRating) {
      this.renderer.setStyle(this.ratingText.nativeElement, 'display', 'none');
    }

    if (!this.rating) {
      this.renderer.setStyle(this.ratingText.nativeElement, 'display', 'none');
    } else {
      this.updateRating(this.rating);
    }
  }

  updateRating(score: number) {
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        this.renderer.setStyle(this.starsArray[i].nativeElement, 'color', '#f4b400');
      } else {
        this.renderer.setStyle(this.starsArray[i].nativeElement, 'color', '#fce8b2'); // yellow light
      }
    }
  }

  onStarClicked(score: number) {
    this.updateRating(score);
    this.clicked.emit(score);
    this.rating = score;
  }
}

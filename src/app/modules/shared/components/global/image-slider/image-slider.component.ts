import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  @Input() currentIndex = 0;
  @Input() images = [];

  constructor() { }

  ngOnInit(): void {
  }

  getImage() {
    return this.images[this.currentIndex];
  }

  onNextClick() {
    if (this.currentIndex === this.images.length - 1) {
      this.currentIndex = 0;
      return;
    }
    this.currentIndex++;
  }

  onPreviousClick() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1;
      return;
    }
    this.currentIndex--;
  }

  onLoad($event) {
    // const { currentSrc } = $event.path[0];
    // this.images.find(item => item.src === currentSrc).isLoaded = true;
  }

  isLoading() {
    return this.images.find(item => item.src === this.images[this.currentIndex].src).isLoaded === false;
  }
}

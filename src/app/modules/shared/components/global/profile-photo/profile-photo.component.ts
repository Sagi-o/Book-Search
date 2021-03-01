import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
  @ViewChild('photoEl', { read: ElementRef, static: true }) photoEl: ElementRef;

  @Input() size = '30px';
  @Input() radius: string;
  @Input() circleRadius = true;
  @Input() clickable = false;
  @Input() border = true;
  @Input() inline = true;
  @Input() objectFit: 'cover' | 'contain' = 'cover';

  // tslint:disable-next-line:variable-name
  _url: string;

  @Input() set url(value: string) {
    if (!value) {
      this._url = 'assets/images/user.png';
      return;
    }
    this._url = value;
  }

  constructor(public renderer: Renderer2) { }

  ngOnInit() {
    if (this.size) {
      this.renderer.setStyle(this.photoEl.nativeElement, 'width', this.size);
      this.renderer.setStyle(this.photoEl.nativeElement, 'min-width', this.size);
      this.renderer.setStyle(this.photoEl.nativeElement, 'max-width', this.size);
      this.renderer.setStyle(this.photoEl.nativeElement, 'height', this.size);
      this.renderer.setStyle(this.photoEl.nativeElement, 'min-height', this.size);
      this.renderer.setStyle(this.photoEl.nativeElement, 'max-height', this.size);
    }

    if (this.radius) {
      this.renderer.setStyle(this.photoEl.nativeElement, 'border-radius', this.radius);
    }

    if (this.circleRadius) {
      this.renderer.setStyle(this.photoEl.nativeElement, 'border-radius', '50%');
    }

    if (this.border) {
      this.renderer.setStyle(this.photoEl.nativeElement, 'border', this.border + ' solid white');
    }

    this.renderer.setStyle(this.photoEl.nativeElement, 'object-fit', this.objectFit);
  }
}

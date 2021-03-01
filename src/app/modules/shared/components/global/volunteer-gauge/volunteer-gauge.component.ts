import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { UtilsService } from '../../../../shared/services/global/utils.service';

@Component({
  selector: 'app-volunteer-gauge',
  templateUrl: './volunteer-gauge.component.html',
  styleUrls: ['./volunteer-gauge.component.scss']
})
export class VolunteerGaugeComponent implements OnInit {
  @ViewChild('line', { read: ElementRef, static: true }) line: ElementRef;

  @Input() goal = 0;
  @Input() current = 0;
  @Input() percentage;

  constructor(private renderer: Renderer2, private utilsService: UtilsService) { }

  async ngOnInit() {
    if (!this.percentage) {
      this.percentage = (this.current / this.goal) * 100;
    } else if (this.percentage < 0 || this.percentage > 100) {
      console.error('VolunteerGauge: percentage must be between 0 to 100');
      return;
    }

    // await this.utilsService.sleep(300);

    // const p = this.percentage / 100;
    // console.log(p);

    this.renderer.setStyle(this.line.nativeElement, 'width', this.percentage + '%');

    // this.renderer.setStyle(this.line.nativeElement, 'opacity', '1');
    // this.renderer.setStyle(this.line.nativeElement, 'transform', `scaleX(${p})`);

    if (this.percentage < 25) {
      this.renderer.setStyle(this.line.nativeElement, 'background', 'var(--red)');
    } else if (this.percentage >= 25 && this.percentage < 50) {
      this.renderer.setStyle(this.line.nativeElement, 'background', 'var(--yellow)');
    } else if (this.percentage >= 50 && this.percentage < 75) {
      this.renderer.setStyle(this.line.nativeElement, 'background', '#75CAC3');
    } else {
      this.renderer.setStyle(this.line.nativeElement, 'background', 'var(--green)');
    }
  }

}

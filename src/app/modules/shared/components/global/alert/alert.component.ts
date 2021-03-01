import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../../services/global/alert.service';
import { AlertType, Alert } from './alert.model';
import { UtilsService } from '../../../services/global/utils.service';
import { listAnimationFast } from '../../../animations/list.animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [listAnimationFast]
})
export class AlertComponent implements OnInit, OnDestroy {
  readonly showInSeconds = 5.2;

  alerts: Alert[] = [];

  subscription = new Subscription();

  constructor(private alertService: AlertService, private utilsService: UtilsService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((alert: Alert) => {
      this.show(alert);
      // this.playAlertSound();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async show(alert: Alert) {
    this.alerts.push(alert);
    await this.utilsService.sleep(this.showInSeconds * 1000);
    this.close(alert);
    await this.utilsService.sleep(1000);
    this.alerts.shift();
  }

  close(alert: Alert): void {
    alert.opened = false;
  }

  cssClass(alertType: AlertType) {
    // return css class based on alert type
    switch (alertType) {
      case AlertType.Success:
        return 'success';
      case AlertType.Error:
        return 'error';
      case AlertType.Info:
        return 'info';
      case AlertType.Warn:
        return 'warn';
    }
  }

  playAlertSound(){
    const audio = new Audio();
    audio.src = 'assets/sounds/alert.mp3';
    audio.load();
    audio.play();
  }
}

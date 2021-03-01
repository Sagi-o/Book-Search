import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
import { UtilsService } from './utils.service';

@Injectable({
    providedIn: 'root'
})
export class ModalService {

  TRANSITION_SPEED = 150;

  constructor(private domService: DomService, private utilsService: UtilsService) { }

  private modalElementId = 'modal-container';
  private overlayElementId = 'modal-overlay';
  private closeButtonElementId = 'close';

  private isShown = false;

  async init(component: any, inputs: object, outputs: object, isCloseButtonVisible = true, isFullScreenMobile = false) {
    if (this.isShown) {
      await this.destroy();
    }

    const componentConfig = {
      inputs,
      outputs
    };

    this.domService.appendComponentTo(this.modalElementId, component, componentConfig);

    document.getElementById(this.modalElementId).style.transform = 'translateX(-50%) translateY(-50%)';

    document.getElementById(this.modalElementId).style.opacity = '1';
    document.getElementById(this.overlayElementId).style.opacity = '1';

    document.getElementById(this.modalElementId).className = 'shown';
    document.getElementById(this.overlayElementId).className = 'shown';

    if (!isCloseButtonVisible) {
      document.getElementById(this.closeButtonElementId).style.display = 'none';
    } else {
      document.getElementById(this.closeButtonElementId).style.display = 'block';
    }

    if (isFullScreenMobile && window.orientation > -1) {
      document.getElementById(this.modalElementId).style.minHeight = '100%';
      document.getElementById(this.modalElementId).style.minWidth = '100vw';
    }

    this.isShown = true;
  }

  async destroy() {
    document.getElementById(this.modalElementId).style.transform = 'translateX(-50%) translateY(-60%)';

    await this.utilsService.sleep(this.TRANSITION_SPEED);

    document.getElementById(this.modalElementId).style.transform = 'translateX(-50%) translateY(50vh)';

    await this.utilsService.sleep(this.TRANSITION_SPEED);

    // document.getElementById(this.modalElementId).style.transform = 'inherit';

    document.getElementById(this.modalElementId).style.opacity = '0';
    document.getElementById(this.overlayElementId).style.opacity = '0';

    // Sleep amount of ms transition of modal-container and overlay to let them finish animation
    await this.utilsService.sleep(this.TRANSITION_SPEED);

    this.domService.removeComponent();

    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElementId).className = 'hidden';

    // Apply default styling to button and container size
    document.getElementById(this.closeButtonElementId).style.display = 'block';
    document.getElementById(this.modalElementId).style.maxHeight = '90%';
    document.getElementById(this.modalElementId).style.minHeight = '0px';
    document.getElementById(this.modalElementId).style.height = 'fit-content';
    document.getElementById(this.modalElementId).style.minWidth = '0px';
    // document.getElementById(this.modalElementId).style.width = 'fit-content';

    this.isShown = false;
  }
}

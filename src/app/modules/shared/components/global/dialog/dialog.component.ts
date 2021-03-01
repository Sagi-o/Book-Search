import {
  Component, OnInit, HostListener, ElementRef, ViewChild, Renderer2, AfterViewInit,
  ComponentFactoryResolver, ViewContainerRef, OnDestroy
} from '@angular/core';
import { DialogService } from '../../../services/global/dialog.service';
import { Subscription } from 'rxjs';

export interface ChildConfig {
  inputs: object;
  outputs: object;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dialog', { read: ElementRef }) dialog: ElementRef;
  @ViewChild('viewContainerDialog', { static: true, read: ViewContainerRef }) viewContainerDialog: ViewContainerRef;

  trackElement;
  intersectionObserver;
  intersectionTarget;

  dialogSub: Subscription;

  constructor(private dialogService: DialogService, private renderer: Renderer2,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.intersectionObserver.disconnect();
    this.dialogSub.unsubscribe();
  }

  ngAfterViewInit() {
    const options = {
      root: null, // null = viewport
      rootMargin: '0px',
      threshold: 1
    };

    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {

        // Dialog is inside viewport
        if (entry.isIntersecting) {
          return;
        }

        const { boundingClientRect, rootBounds } = entry;

        if (boundingClientRect.right > rootBounds.width && boundingClientRect.bottom > rootBounds.height) {
          // console.log('Intersect in right and bottom');
          const x = rootBounds.right - boundingClientRect.width - 28;
          const y = rootBounds.bottom - boundingClientRect.height - 28;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
          continue;
        }

        if (boundingClientRect.left < rootBounds.x && boundingClientRect.bottom > rootBounds.height) {
          // console.log('Intersect in left and bottom');
          const x = rootBounds.left + (-1) * boundingClientRect.x;
          const y = rootBounds.bottom - boundingClientRect.height - 28;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
          continue;
        }

        if (boundingClientRect.right > rootBounds.width && boundingClientRect.top < rootBounds.y) {
          // console.log('Intersect in right and top');
          const x = rootBounds.right - boundingClientRect.width - 28;
          const y = rootBounds.bottom - boundingClientRect.height - 28;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
          continue;
        }

        if (boundingClientRect.left < rootBounds.x && boundingClientRect.top < rootBounds.y) {
          // console.log('Intersect in left and top');
          const x = rootBounds.left + (-1) * boundingClientRect.x;
          const y = rootBounds.top + (-1) * boundingClientRect.y + 28;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
          continue;
        }

        // Intersect on right side
        if (boundingClientRect.right > rootBounds.width) {
          // console.log('Intersect on right');
          const x = rootBounds.right - boundingClientRect.width - 28;
          // const x = rootBounds.width - boundingClientRect.width - delta;
          const y = boundingClientRect.y;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
        }

        // Intersect on left side
        if (boundingClientRect.left < rootBounds.x) {
          // console.log('Intersect on left');
          const x = rootBounds.left + (-1) * boundingClientRect.x;
          const y = boundingClientRect.y;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
        }

        // Intersect on bottom side
        if (boundingClientRect.bottom > rootBounds.height) {
          // console.log('Intersect on bottom');
          const x = boundingClientRect.x;
          const y = rootBounds.bottom - boundingClientRect.height - 28;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
        }

        // Intersect on top side
        if (boundingClientRect.top < rootBounds.y) {
          // console.log('Intersect on top');
          const x = boundingClientRect.x;
          const y = rootBounds.top + (-1) * boundingClientRect.y + 28;
          this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
          this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
        }
      }
    }, options);

    this.intersectionTarget = document.querySelector('#dialog');
    this.intersectionObserver.observe(this.intersectionTarget);

    // TODO: Do not forget to unsubscribe
    this.dialogSub = this.dialogService.getSubject().subscribe(item => {
      this.trackElement = item.trackElement;
      const { left, top } = item.trackElement.getBoundingClientRect();
      this.updatePosition(left, top);
      this.createComponent(item.config, item.component);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.trackElement) {
      return;
    }
    const { x, y } = this.trackElement.getBoundingClientRect();
    this.updatePosition(x, y);
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (!this.trackElement) {
      return;
    }
    const { x, y } = this.trackElement.getBoundingClientRect();
    this.updatePosition(x, y);
  }

  updatePosition(x: number, y: number) {
    this.renderer.setStyle(this.dialog.nativeElement, 'left', x + 'px');
    this.renderer.setStyle(this.dialog.nativeElement, 'top', y + 'px');
  }

  createComponent(config: ChildConfig, component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.viewContainerDialog.clear();
    const componentRef = this.viewContainerDialog.createComponent(componentFactory);
    this.attachConfig(config, componentRef);
  }

  private attachConfig(config, componentRef) {
    const inputs = config.inputs;
    const outputs = config.outputs;

    // tslint:disable-next-line:forin
    for (const key in inputs) {
      componentRef.instance[key] = inputs[key];
    }
    // tslint:disable-next-line:forin
    for (const key in outputs) {
      componentRef.instance[key] = outputs[key];
    }
  }
}

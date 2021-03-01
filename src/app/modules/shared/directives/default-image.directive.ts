import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'img[src]'
})
export class DefaultImageDirective {
    private imagePlaceholderSrc = '/assets/images/placeholder.svg';

    constructor(private el: ElementRef, { nativeElement }: ElementRef<HTMLImageElement>) {
        const supports = 'loading' in HTMLImageElement.prototype;
        if (supports) {
            nativeElement.setAttribute('loading', 'lazy');
        }
    }

    @HostListener('error')
    onError() {
        this.el.nativeElement.src = this.imagePlaceholderSrc;
    }
}

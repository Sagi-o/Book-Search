import { Injectable } from '@angular/core';

// tslint:disable-next-line:ban-types
declare let gtag: Function;

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {
    constructor() { }

    public emitEvent(
        eventName: string,
        eventCategory: string,
        eventLabel: string = null,
        eventValue: number = null) {
        if (document.location.hostname === 'localhost') { return; }
        gtag('event', eventName, {
            // tslint:disable-next-line:object-literal-key-quotes
            'event_category': eventCategory,
            // tslint:disable-next-line:object-literal-key-quotes
            'event_label': eventLabel,
            // tslint:disable-next-line:object-literal-key-quotes
            'event_value': eventValue
        });
    }

    // tslint:disable-next-line:variable-name
    public emitPageNavigation(page_path: string) {
        if (document.location.hostname === 'localhost') { return; }
        gtag('config', 'UA-177350324-1',
            {
                // tslint:disable-next-line:object-literal-key-quotes
                'page_path': page_path
            }
        );
    }
}

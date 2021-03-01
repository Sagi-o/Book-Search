import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChildConfig } from '../../models/child-config.model';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private subject = new Subject<any>();

    constructor() { }

    show(config: ChildConfig, component: any, trackElement: any) {
        this.subject.next({ config, component, trackElement });
    }

    getSubject() {
        return this.subject.asObservable();
    }
}


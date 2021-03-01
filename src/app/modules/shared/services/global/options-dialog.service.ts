import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OptionsDialogService {
  private subject = new Subject<any>();
  private chosenOption = new Subject<any>();

  constructor() {
  }

  show(title: string, options: any[]) {
    this.subject.next({ title, options, chosenOption: this.chosenOption } as any);
    return this.chosenOption.asObservable().pipe(first());
  }

  getSubject() {
    return this.subject.asObservable();
  }
}

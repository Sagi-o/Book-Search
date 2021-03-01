import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myDatePipe' })
export class MyDatePipe implements PipeTransform {
    // transform '2020-08-22'
    transform(value: string): string {
        return value.slice(0, 10);
    }
}

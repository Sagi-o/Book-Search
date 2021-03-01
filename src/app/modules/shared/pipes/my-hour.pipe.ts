import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myHourPipe' })
export class MyHourPipe implements PipeTransform {
    transform(value: string): string {
        return value.slice(0, 5);
    }
}

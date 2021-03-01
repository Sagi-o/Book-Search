import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }]
})
export class SwitchComponent implements OnInit, ControlValueAccessor {
  @Input() isDisabled = false;
  @Input() isOn = true;
  @Output() changed: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Function to call when the data changes
  onChange = (value: boolean) => { console.log('Switch data changed! to: ' + value); };

  // Function to call when the component is touched (when the switch is clicked)
  onTouched = () => { console.log('Switch touched! (make it toggle?)'); };

  writeValue(value: boolean): void {
    // this.isOn = value;
    // console.log('Switch isOn changed to: ' + this.isOn);
    this.changed.emit(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  toggle() {
    // this.isOn = !this.isOn;
    this.writeValue(!this.isOn);
  }

}

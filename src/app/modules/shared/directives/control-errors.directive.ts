
import { NgControl } from '@angular/forms';
import { Subject, merge, EMPTY, Observable, fromEvent } from 'rxjs';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { ControlErrorComponent } from '../components/global/control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { Directive,
    OnInit,
    Self,
    OnDestroy,
    Optional,
    Host,
    ComponentRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ElementRef
} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
    click$ = fromEvent(this.host.nativeElement, 'click').pipe(shareReplay(1));

    submit$: Observable<Event>;
    // click$ = fromEvent(this.control, 'click').pipe(shareReplay(1));

    controlErrorComponent: ComponentRef<ControlErrorComponent>;
    ngUnsubscribe = new Subject();

    // Every valid error translation needs to be added here
    validTranslationKeys = ['required', 'email', 'minlength', 'maxlength'];

    constructor(@Self() private control: NgControl,
                @Optional() @Host() private form: FormSubmitDirective,
                // @Inject(FORM_ERRORS) private errors,
                private host: ElementRef<HTMLFormElement>,
                private vcr: ViewContainerRef,
                private resolver: ComponentFactoryResolver) {
                    this.submit$ = this.form ? this.form.submit$ : EMPTY;
                    // this.click$ = this.form ? this.form.click$ : EMPTY;
                }

    ngOnInit() {
        merge(
            this.click$,
            // this.submit$,
            this.control.valueChanges
        ).pipe(
            takeUntil(this.ngUnsubscribe)
        ).subscribe(async () => {
            // Error object for example: {minlength: 6, requiredlength: 10}
            const controlErrors = this.control.errors;
            // console.log(controlErrors);
            if (controlErrors) {
                const errorName = Object.keys(controlErrors)[0]; // required or minLength for example

                // Only errors that have translation will be shown
                if (!this.validTranslationKeys.includes(errorName)) {
                    this.setError(null);
                    return;
                }
                const getError = controlErrors[errorName];
                const text = getError(controlErrors[errorName]);
                // console.log(`errorName: ${errorName},
                // getError: ${getError},controlErrors[errorName]: ${JSON.stringify(controlErrors[errorName])} ,text: ${text}`);
                // const text = await this.translate.get(`control_errors.${errorName}`, controlErrors[errorName]).toPromise();
                this.setError(text);
            } else if (this.controlErrorComponent) {
                this.setError(null);
            }
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    setError(text: string) {
        // If component not already exists, build factory with resolver, create and assign it to the reference
        if (!this.controlErrorComponent) {
            const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
            this.controlErrorComponent = this.vcr.createComponent(factory);
        }
        // Else just change the text variable inside it
        this.controlErrorComponent.instance.text = text;
    }
}

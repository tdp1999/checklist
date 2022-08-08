import {
    ComponentRef,
    Directive,
    ElementRef,
    Host,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    ViewContainerRef,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { FORM_ERRORS } from '../../constants/error-message';

@Directive({
    selector: 'mat-error, [customError]',
})
export class ControlErrorDirective implements OnInit, OnDestroy {
    @Input() control: AbstractControl | null = null;
    private _subscription = new Subscription();

    constructor(@Inject(FORM_ERRORS) private errors: any, private el: ElementRef) {}

    ngOnInit() {
        this._subscription.add(
            this.control?.valueChanges.subscribe(() => {
                const controlErrors = this.control?.errors;
                if (controlErrors) {
                    const firstKey = Object.keys(controlErrors)[0];
                    const getError = this.errors[firstKey];
                    const errorMessage = getError(controlErrors[firstKey]);
                    this.showError(errorMessage);
                }
            })
        );
    }

    showError(errorMessage: string) {
        this.el.nativeElement.innerText = errorMessage;
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

import {
    ComponentRef,
    Directive,
    ElementRef,
    Host,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    ViewContainerRef,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { EMPTY, merge, Observable, Subscription } from 'rxjs';
import { FORM_ERRORS } from '../../constants/error-message';

@Directive({
    selector: 'mat-error, [customError]',
})
export class ControlErrorDirective implements OnChanges, OnDestroy {
    @Input() control: AbstractControl | null = null;
    @Input() matControl: MatFormFieldControl<any> | null = null;
    private _subscription = new Subscription();

    constructor(@Inject(FORM_ERRORS) private errors: any, private el: ElementRef) {}

    ngOnChanges() {
        this._subscription.add(
            this.control?.statusChanges.subscribe((status) => {
                if (
                    status === 'INVALID' &&
                    this.control?.errors &&
                    (this.control.touched || this.control.dirty)
                ) {
                    const controlErrors = this.control?.errors;
                    console.log('object', controlErrors);

                    const firstKey = Object.keys(controlErrors)[0];
                    const getError = this.errors[firstKey];
                    const errorMessage = getError(controlErrors[firstKey]);
                    console.log('error message', errorMessage);

                    this.showError(errorMessage);
                }
            })
        );
        // this._subscription.add(
        //     this.control?.valueChanges.subscribe(() => {
        //         const controlErrors = this.control?.errors;
        //         if (controlErrors) {
        //             const firstKey = Object.keys(controlErrors)[0];
        //             const getError = this.errors[firstKey];
        //             const errorMessage = getError(controlErrors[firstKey]);
        //             this.showError(errorMessage);
        //         }
        //     })
        // );
    }

    showError(errorMessage: string) {
        this.el.nativeElement.innerText = errorMessage;
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

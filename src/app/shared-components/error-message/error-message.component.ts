import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Inject,
    Injector,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { FORM_ERRORS } from 'src/app/common/constants/error-message';

@Component({
    selector: '[matErrorMessage]',
    template: '{{ error }}',
})
export class ErrorMessageComponent implements AfterViewInit {
    public error = '';
    private _inputRef!: MatFormFieldControl<MatInput>;
    private _subscription = new Subscription();

    constructor(
        private _inj: Injector,
        @Inject(FORM_ERRORS) private errors: any,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        const container = this._inj.get(MatFormField);
        this._inputRef = container._control;

        this._subscription.add(
            this._inputRef.ngControl?.statusChanges?.subscribe((state) =>
                this.updateError(state, container)
            )
        );
    }

    updateError(state: FormControlStatus, container: MatFormField) {
        if (state === 'INVALID' && this._inputRef.ngControl?.errors) {
            this.renderer.addClass(container._elementRef.nativeElement, 'mb-2');
            const controlErrors = this._inputRef.ngControl?.errors;
            const firstKey = Object.keys(controlErrors)[0];
            const getError = this.errors[firstKey];
            this.error = getError(controlErrors[firstKey]);
        } else container._elementRef.nativeElement.classList.remove('mb-2');
    }
}

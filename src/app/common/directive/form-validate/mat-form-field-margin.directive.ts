import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, Self } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: 'mat-form-field, [customErrorField]',
})
export class MatFormFieldMarginDirective implements OnInit, OnDestroy {
    @Input() control: AbstractControl | null = null;
    private _subscription = new Subscription();

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this._subscription.add(
            this.control?.valueChanges.subscribe(() => {
                // if (this.control?.errors && (this.control?.dirty || this.control?.touched)) {
                if (this.control?.errors) {
                    // if (this.control?.errors && this.control?.dirty) {
                    this.renderer.addClass(this.el.nativeElement, 'mb-2');
                } else if (this.el.nativeElement.classList.contains('mb-2')) {
                    this.el.nativeElement.classList.remove('mb-2');
                }
            })
        );
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

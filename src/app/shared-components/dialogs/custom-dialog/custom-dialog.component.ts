import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import {
    debounceTime,
    delay,
    distinctUntilChanged,
    filter,
    map,
    startWith,
    switchMap,
    take,
    tap,
} from 'rxjs/operators';
import { SlugifyPipe } from 'src/app/common/pipe/slugify/slugify.pipe';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { SubSink } from 'subsink';

export interface DialogData {
    action: ActionType;
    callback?: (data: any) => void;
    validateList?: {
        [key: string]: (control: AbstractControl) => Observable<ValidationErrors | null>;
    };
    thisRef?: any;
    payload?: any;
}

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrls: ['./custom-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SlugifyPipe],
})
export class CustomDialogComponent implements OnInit, OnDestroy {
    public form!: FormGroup;

    public title = '';
    public submitText = 'OK';

    private _subs = new SubSink();

    constructor(
        private _fb: FormBuilder,
        private _cdr: ChangeDetectorRef,
        private _slugifyPipe: SlugifyPipe,
        private _dialogRef: MatDialogRef<CustomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    // Life cycle hooks
    ngOnInit(): void {
        this._dialogRef.updateSize('60%', 'fit-content');

        switch (this.data.action) {
            case ActionType.CREATE:
                // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
                this.title = 'Create New Category';
                this.submitText = 'Add';
                this.form = this._fb.group({
                    name: ['', [Validators.required]],
                    slug: [
                        '',
                        [Validators.required],
                        this.data.validateList?.slug.bind(this.data.thisRef),
                    ],
                    completePercentage: [0],
                    description: [''],
                });
                break;
            case ActionType.EDIT:
                this.title = 'Edit Category';
                this.submitText = 'Save';

                this.form = this._fb.group({
                    _id: [this.data.payload._id],
                    name: [this.data.payload.name],
                    slug: [this.data.payload.slug],
                    // completePercentage: [this.data.payload.completePercentage],
                    description: [this.data.payload.description],
                });
                break;
        }

        this.autocompleteSlug();
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    // Form Related Methods

    // Form Gettter
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    submitForm() {
        console.log(this.data.action);
        console.log(this.form.value);
        this.data.callback?.bind(this.data.thisRef)(this.form.value);
        this._cdr.markForCheck();
    }

    // Autocomplete slug field based on name field
    autocompleteSlug() {
        this._subs.add(
            this.f.name.valueChanges
                .pipe(
                    filter((value) => value.length > 0),
                    startWith(this.f.name.value),
                    distinctUntilChanged(),
                    debounceTime(500),
                    tap((value) => {
                        this.f.slug.setValue(this._slugifyPipe.transform(value));
                    })
                )
                .subscribe()
        );
    }
}

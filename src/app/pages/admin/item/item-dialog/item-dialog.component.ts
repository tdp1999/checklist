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
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from 'src/app/common/schema/category';
import { ActionType } from 'src/app/common/schema/datatable/Action';
import { Item } from 'src/app/common/schema/item';
import { SubSink } from 'subsink';

export interface ItemDialogData {
    action: ActionType;
    callback?: (data: any) => void;
    validateList?: {
        [key: string]: (control: AbstractControl) => Observable<ValidationErrors | null>;
    };
    thisRef?: any;
    payload?: Item;
    category?: Category[];
}

@Component({
    selector: 'app-item-dialog',
    templateUrl: './item-dialog.component.html',
    styleUrls: ['./item-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDialogComponent implements OnInit, OnDestroy {
    public form!: FormGroup;

    public title = '';
    public submitText = 'OK';

    private _subs = new SubSink();

    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<ItemDialogComponent>,
        private _cdr: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: ItemDialogData
    ) {}

    // Life cycle hooks
    ngOnInit(): void {
        this._dialogRef.updateSize('60%', 'fit-content');

        switch (this.data.action) {
            case ActionType.CREATE:
                // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
                this.title = 'Create New Item';
                this.submitText = 'Add';
                this.generateForm();
                break;
            case ActionType.EDIT:
                this.title = 'Edit Item';
                this.submitText = 'Save';
                this.generateForm(this.data.payload);
                break;
        }
    }

    ngOnDestroy(): void {
        this._subs.unsubscribe();
    }

    // Form Related Methods

    // Form Gettter
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    // Form Generate
    generateForm(editValue?: Item): void {
        this.form = this._fb.group({
            name: [editValue ? editValue.name : '', [Validators.required]],
            slug: [
                editValue ? editValue.slug : '',
                [Validators.required],
                this.data.validateList?.slug.bind(this.data.thisRef),
            ],
            categoryId: [editValue ? editValue.categoryId : '', [Validators.required]],
            content: [editValue ? editValue.content : '', [Validators.required]],
            isDone: [editValue ? editValue.isDone : false],
        });

        if (editValue) {
            this.form.addControl('id', this._fb.control(editValue.id));

            let slugControl = this.form.get('slug') as FormControl;
            slugControl?.disable();
            slugControl?.removeAsyncValidators;
        }
    }

    submitForm() {
        this.data.callback?.bind(this.data.thisRef)(this.form.getRawValue());
        this._cdr.markForCheck();
    }
}

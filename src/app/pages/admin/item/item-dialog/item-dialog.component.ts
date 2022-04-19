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
        switch (this.data.action) {
            case ActionType.CREATE:
                // https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
                this.title = 'Create New Item';
                this.submitText = 'Add';
                this.form = this._fb.group({
                    name: ['', [Validators.required]],
                    slug: [
                        '',
                        [Validators.required],
                        this.data.validateList?.slug.bind(this.data.thisRef),
                    ],
                    categoryId: ['', [Validators.required]],
                    content: ['', [Validators.required]],
                    isDone: [false],
                });
                break;
            case ActionType.EDIT:
                this.title = 'Edit Item';
                this.submitText = 'Save';

                this.form = this._fb.group({
                    id: [this.data.payload?.id],
                    name: [this.data.payload?.name],
                    slug: [this.data.payload?.slug],
                    categoryId: [this.data.payload?.categoryId],
                    content: [this.data.payload?.content],
                });
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

    submitForm() {
        this.data.callback?.bind(this.data.thisRef)(this.form.value);
        this._cdr.markForCheck();
    }
}

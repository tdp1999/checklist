import { Component, Inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActionType } from 'src/app/common/schema/datatable/Action';

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrls: ['./custom-dialog.component.scss'],
})
export class CustomDialogComponent implements OnInit {
    public form!: FormGroup;

    public title = '';
    public submitText = 'OK';

    constructor(
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<CustomDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        switch (this.data.action) {
            case ActionType.CREATE:
                console.log(this.data.validateSlug);
                this.form = this._fb.group({
                    name: [''],
                    slug: [
                        '',
                        Validators.compose([Validators.required]),
                        this.data.validateSlug.bind(this.data.thisRef),
                    ],
                    completePercentage: [0],
                });
                break;
            case ActionType.EDIT:
                this.title = 'Edit Category';
                this.submitText = 'Save';

                this.form = this._fb.group({
                    id: [this.data.id],
                    name: [this.data.name],
                    slug: [this.data.slug],
                    completePercentage: [this.data.completePercentage],
                });
                break;
        }
    }

    onNoClick() {
        console.log('no');
        this._dialogRef.close();
    }
}

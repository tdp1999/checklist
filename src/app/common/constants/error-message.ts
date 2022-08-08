import { InjectionToken } from '@angular/core';

export enum ErrorMessage {
    CategoryNotFound = 'Category not found!',
    ContentNotFound = 'Content not found!',
    RequiredField = 'This field is required!',
}

export const defaultErrors = {
    required: (error: any) => `This field is required!`,
    minlength: (error: any) =>
        `This field must be at least ${error.requiredLength} characters long!`,
    slugExists: (error: any) => `Slug already exists!`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors,
});

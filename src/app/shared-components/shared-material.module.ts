import { NgModule } from '@angular/core';

// Import Material Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';

const sharedComponent = [MatSnackBarModule];

@NgModule({
    declarations: [],
    imports: [...sharedComponent],
    exports: [...sharedComponent],
})
export class SharedMaterialModule {}

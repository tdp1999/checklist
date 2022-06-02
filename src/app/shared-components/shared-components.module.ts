import { NgModule } from '@angular/core';
import { FooterModule } from '../layouts/blocks/footer/footer.module';
import { HeaderModule } from '../layouts/blocks/header/header.module';
import { SidebarModule } from '../layouts/blocks/sidebar/sidebar.module';
import { BreadcrumbModule } from '../layouts/blocks/breadcrumb/breadcrumb.module';
// import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';

const sharedComponent = [
    HeaderModule,
    FooterModule,
    SidebarModule,
    BreadcrumbModule,
    // LoadingSpinnerModule,
];

@NgModule({
    declarations: [],
    imports: [...sharedComponent],
    exports: [...sharedComponent],
})
export class SharedComponentsModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FluidLayoutComponent } from './layouts/fluid-layout/fluid-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from './shared-components/shared-material.module';
import { HighlightService } from './common/service/highlight.service';

// Prism
import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';

@NgModule({
    declarations: [AppComponent, FluidLayoutComponent, MainLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedComponentsModule,
        SharedMaterialModule,
    ],
    providers: [HighlightService],
    bootstrap: [AppComponent],
})
export class AppModule {}

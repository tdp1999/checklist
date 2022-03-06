import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FluidLayoutComponent } from './layouts/fluid-layout/fluid-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, FluidLayoutComponent, MainLayoutComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedComponentsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

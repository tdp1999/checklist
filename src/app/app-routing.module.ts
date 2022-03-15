import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamsSectionResolver } from './common/resolver/params-section.resolver';
import { FluidLayoutComponent } from './layouts/fluid-layout/fluid-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
    // Fluid layout
    {
        path: '',
        component: FluidLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'projects',
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
            },
        ],
    },
    // Main layout
    {
        path: 'checklist',
        component: MainLayoutComponent,
        // data: { breadcrumb: 'Checklist' },
        children: [
            {
                path: ':section',
                loadChildren: () => import('./pages/list/list.module').then((m) => m.ListModule),
                data: { breadcrumb: (data: any) => data.section },
                resolve: { section: ParamsSectionResolver },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

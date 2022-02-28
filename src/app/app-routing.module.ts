import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
          import('./pages/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
    ],
  },
  // Main layout
  {
    path: 'checklist',
    component: MainLayoutComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

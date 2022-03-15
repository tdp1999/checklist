import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamsItemResolver } from 'src/app/common/resolver/params-item.resolver';
import { ListComponent } from './list.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    {
        path: ':item',
        loadChildren: () => import('../detail/detail.module').then((m) => m.DetailModule),
        data: { breadcrumb: (data: any) => data.item },
        resolve: { item: ParamsItemResolver },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListRoutingModule {}

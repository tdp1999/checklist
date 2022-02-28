import { NgModule } from '@angular/core';
import { FooterModule } from '../layouts/blocks/footer/footer.module';
import { HeaderModule } from '../layouts/blocks/header/header.module';
import { SidebarModule } from '../layouts/blocks/sidebar/sidebar.module';

const sharedComponent = [HeaderModule, FooterModule, SidebarModule];

@NgModule({
  declarations: [],
  imports: [...sharedComponent],
  exports: [...sharedComponent],
})
export class SharedComponentsModule {}

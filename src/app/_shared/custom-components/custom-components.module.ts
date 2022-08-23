import { NgModule } from '@angular/core';
import { WidgetModule } from '@shared/custom-components/widget/widget.module';

@NgModule({
  exports: [WidgetModule],
})
export class CustomComponentsModule {
}

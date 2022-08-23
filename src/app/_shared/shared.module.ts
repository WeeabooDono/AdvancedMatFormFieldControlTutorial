import { NgModule } from '@angular/core';
import { CustomFormFieldsModule } from '@shared/custom-form-fields/custom-form-fields.module';
import { CustomComponentsModule } from '@shared/custom-components/custom-components.module';

@NgModule({
  exports: [CustomFormFieldsModule, CustomComponentsModule],
})
export class SharedModule {
}

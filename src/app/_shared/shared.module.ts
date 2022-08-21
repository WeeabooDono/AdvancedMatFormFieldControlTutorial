import { NgModule } from '@angular/core';
import { CustomFormFieldsModule } from '@shared/custom-form-fields/custom-form-fields.module';

@NgModule({
  exports: [CustomFormFieldsModule],
})
export class SharedModule {
}

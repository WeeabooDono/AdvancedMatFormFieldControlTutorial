import { NgModule } from '@angular/core';
import {
  AdvancedSearchControlModule
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.module';

@NgModule({
  exports: [AdvancedSearchControlModule],
})
export class CustomFormFieldsModule {
}

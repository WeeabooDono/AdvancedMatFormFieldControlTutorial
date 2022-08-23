import { NgModule } from '@angular/core';
import {
  AdvancedSearchControlComponent
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AdvancedSearchControlRequiredDirective
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.required.directive';

@NgModule({
  imports: [
    MatSelectModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [AdvancedSearchControlComponent, AdvancedSearchControlRequiredDirective],
  exports: [AdvancedSearchControlComponent, AdvancedSearchControlRequiredDirective],
})
export class AdvancedSearchControlModule {
}

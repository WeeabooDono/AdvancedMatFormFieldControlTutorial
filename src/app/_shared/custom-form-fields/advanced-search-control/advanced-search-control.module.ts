import { NgModule } from '@angular/core';
import {
  AdvancedSearchControlComponent
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    MatSelectModule,
    MatDividerModule,
    MatInputModule,
  ],
  declarations: [AdvancedSearchControlComponent],
  exports: [AdvancedSearchControlComponent],
})
export class AdvancedSearchControlModule {
}

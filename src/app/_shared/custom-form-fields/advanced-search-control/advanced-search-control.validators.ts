import {
  AdvancedSearchControlComponent,
} from 'src/app/_shared/custom-form-fields/advanced-search-control/advanced-search-control.component';

export class AdvancedSearchControlValidators {

  static required(control: AdvancedSearchControlComponent) {
    return control.value.scope !== null && control.value.query !== '' ? null : { required: { valid: true } };
  }

}

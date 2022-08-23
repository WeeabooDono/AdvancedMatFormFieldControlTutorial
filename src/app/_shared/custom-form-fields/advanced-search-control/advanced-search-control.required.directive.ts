import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import {
  AdvancedSearchControlValidators,
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.validators';

@Directive({
  selector: '[required]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AdvancedSearchControlRequiredDirective,
    multi: true,
  }],
})
export class AdvancedSearchControlRequiredDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return AdvancedSearchControlValidators.required(control);
  }
}

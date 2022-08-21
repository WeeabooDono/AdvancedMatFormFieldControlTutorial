import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * Cette classe est un example que l'on peut modifier pour avoir la detection de l'état au moment souhaite.
 * Cette classe va avoir le même comportement que le comporenement de l`ErrorStateMatcher` par défaut
 */
export class AdvancedSearchControlErrorStateMatcher implements ErrorStateMatcher {

  public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control?.touched! && control?.invalid;
  }
}

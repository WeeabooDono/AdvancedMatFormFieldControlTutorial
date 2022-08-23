export class AdvancedSearchControlValidators {

  static required(control: any): any | null {
    return control.value.scope !== null && control.value.query !== '' ? null : { required: { valid: true } };
  }

}

import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  AdvancedSearchControlValidators,
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.validators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  @HostBinding('class.home') public isHome: boolean = true;

  public form: FormGroup;

  get searchCtrl(): AbstractControl | null {
    return this.form.get('search');
  }

  get searchErrorMessage(): string | undefined {
    if (this.searchCtrl?.hasError('required')) {
      return 'Un nom de ville doit être renseigné.';
    }
    return;
  }

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      input: 'Une valeur',
      search: [{ disabled: false, value: { scope: '', query: '' } }],
    });
  }

  public submit(): void {
    console.log(this.form.value);
  }
}

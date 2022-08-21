import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      input: 'Une valeur',
      search: [{ scope: '', query: 'Paris' }, []],
    });
  }

  public submit(): void {
    console.log(this.form.value);
  }
}

import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  AdvancedSearchControlComponent,
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.component';
import { WidgetWrapperComponent } from '@shared/custom-components/widget/widget-wrapper/widget-wrapper.component';
import { WidgetWeatherComponent } from '@shared/custom-components/widget/widget-weather/widget-weather.component';
import { WidgetDateComponent } from '@shared/custom-components/widget/widget-date/widget-date.component';
import {
  AdvancedSearchControlRequiredDirective
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.required.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    WidgetWrapperComponent,
    WidgetWeatherComponent,
    WidgetDateComponent,
    AdvancedSearchControlComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    AdvancedSearchControlRequiredDirective,
  ],
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
      search: [{ disabled: true, value: { scope: '', query: '' } }],
    });
  }

  public submit(): void {
    console.log(this.form.value);
  }
}

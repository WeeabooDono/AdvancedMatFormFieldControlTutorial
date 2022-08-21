import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormFieldValue } from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.model';
import { AbstractControlDirective, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-advanced-search',
  templateUrl: 'advanced-search-control.component.html',
  styleUrls: ['advanced-search-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  /**
   * On va dire à Angular que l'on va lui fournir un objet de type `MatFormFieldControl` à travers notre control
   * customisé `AdvancedSearchControlComponent`.
   */
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: AdvancedSearchControlComponent,
    },
  ],
})
export class AdvancedSearchControlComponent implements MatFormFieldControl<FormFieldValue> {
  @HostBinding('class.app-advanced-search-control') public isAppAdvancedSearch: boolean = true;

  readonly autofilled?: boolean;
  readonly controlType?: string;
  readonly disabled: boolean;
  readonly empty: boolean;
  readonly errorState: boolean;
  readonly focused: boolean;
  readonly id: string;
  readonly ngControl: NgControl | AbstractControlDirective | null;

  readonly placeholder: string;
  readonly required: boolean;

  readonly shouldLabelFloat: boolean;

  /**
   * Cet observable est utilisé pour notifié qu'il y a un changement. En effet, le `ChangeDetection`
   * des `MatFormFieldControl` est `OnPush`.
   */
  readonly stateChanges: Subject<void> = new Subject<void>();
  readonly userAriaDescribedBy?: string;
  value: FormFieldValue | null;

  public onContainerClick(event: MouseEvent): void {
  }

  public setDescribedByIds(ids: string[]): void {
  }

}

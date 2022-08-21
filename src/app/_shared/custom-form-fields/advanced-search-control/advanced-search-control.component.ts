import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormFieldValue } from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.model';
import { AbstractControlDirective, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';

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
export class AdvancedSearchControlComponent implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue> {
  /**
   * Ce champ va correspondre au prochain id à ajouter à la classe de notre `AdvancedSearchControlComponent`.
   */
  static nextId = 0;

  @HostBinding('class.app-advanced-search-control') public isAppAdvancedSearch: boolean = true;

  @ViewChild(MatInput, { read: ElementRef, static: true })
  private _inputRef: ElementRef;

  /**
   * Ajoute une classe pour identifier le composant dans le `MatFormField`.
   */
  @HostBinding()
  public id = `advanced-search-form-field-id-${ AdvancedSearchControlComponent.nextId++ }`;

  /**
   * Cet propriétée retourne un booleen qui nous dit si l'on va afficher le contenu de `<mat-label>...</mat-label>`
   * par dessus le composant ou flottant.
   */
  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby')
  public userAriaDescribedBy?: string;

  /**
   * Cet observable est utilisé pour notifié qu'il y a un changement. En effet, le `ChangeDetection`
   * des `MatFormFieldControl` est `OnPush`.
   */
  public stateChanges: Subject<void> = new Subject<void>();

  /**
   * @private Un élément indispendable qui permet de bind notre entrée aux données dans le control.
   */
  private _value: FormFieldValue;

  @Input()
  set value(value: FormFieldValue) {
    this._value = value;
    this.stateChanges.next();
  }

  get value(): FormFieldValue {
    return this._value;
  }

  /**
   * @private Le placeholder du composant, si le control n'est pas 'touched', le placeholder ne s'affichera pas.
   */
  private _placeholder: string;

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this._placeholder;
  }

  /**
   * @private Permet de déterminer si le control est requis.
   */
  private _required: boolean;

  @Input()
  set required(required: BooleanInput) {
    this._required = coerceBooleanProperty(required);
  };

  get required(): boolean {
    return this._required;
  }

  /**
   * @private Permet de déterminer si le control est désactivé.
   */
  private _disabled: boolean;

  @Input()
  set disabled(disabled: BooleanInput) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  };

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Permet de déterminer si le control est en erreur ou pas. Pour cette étape du tutoriel, on le met à false.
   */
  public errorState: boolean = false;

  /**
   * Donne l'information sur l'état du control, si il a le focus ou pas.
   */
  public focused: boolean = false;

  /**
   * Détermine l'état 'empty' du control. Ici on vérifie qu'aucun des champs ne sont remplis.
   */
  get empty(): boolean {
    return !this.value?.query && !this.value?.scope;
  }

  /**
   * Permet de déterminer si le control est dans l'état autofill ou pas.
   * Si la propriété n'est pas présente, le control est considéré comme non autofill.
   *
   * Pour ce tutoriel, on se contentera de commenter cette partie. Je n'ai pas trouvé de cas d'usage pour cet élément.
   */
  // readonly autofilled?: boolean;

  /**
   * Un nom optionel qui permet de distinguer les différents `mat-form-field` selon leur type de control.
   * le formulaire ajoutera une class `mat-form-field-type-{{controlType}}` à son élément de base.
   */
  readonly controlType?: string = 'app-advanced-search-form-field';

  /**
   * L'`AbstractControlDirective` du control. Pour cette étape du tutoriel, on le laisse à null.
   */
  readonly ngControl: NgControl | AbstractControlDirective | null = null;

  constructor(private _focusMonitor: FocusMonitor) {
  }

  /**
   * Dans cette partie on veut monitorer notre input text afin de changer l'état à focus quand on clic
   * sur le formulaire.
   */
  public ngOnInit() {
    this._focusMonitor.monitor(this._inputRef).subscribe((focused: FocusOrigin) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
  }

  /**
   * On veut qu'à chaque changements, on notifie angular qu'il y a eu une modification.
   */
  public ngOnChanges() {
    this.stateChanges.next();
  }

  /**
   * Permet de faire des actions au click.
   * @param event
   */
  public onContainerClick(event: MouseEvent): void {
    // cette ligne dit que quand on click sur le container on simule le focus sur l'input.
    this._focusMonitor.focusVia(this._inputRef, 'program');
  }

  /**
   * Ajoute la valeur des ids à l'attribut `aria-describedby`.
   *
   * @param ids
   */
  public setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }

  /**
   * On n'oublis surtout pas de terminer les souscriptions.
   */
  public ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._inputRef);
    this.stateChanges.complete();
  }
}

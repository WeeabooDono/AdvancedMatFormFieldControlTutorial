import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormFieldValue } from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.model';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { MatInput } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

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
export class AdvancedSearchControlComponent implements OnInit, OnDestroy, MatFormFieldControl<FormFieldValue>, ControlValueAccessor {
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
   * Le formulaire interne.
   */
  public form: FormGroup;

  /**
   * fonction de callback pour le onChange
   * @param _ la valeur transmise au control
   */
  private onChange = (_: FormFieldValue | null) => {
  };

  /**
   * fonction de callback pour le onTouched
   */
  private onTouched = () => {
  };

  /**
   * Cet observable est utilisé pour notifié qu'il y a un changement. En effet, le `ChangeDetection`
   * des `MatFormFieldControl` est `OnPush`.
   */
  public stateChanges: Subject<void> = new Subject<void>();

  /**
   * Plus besoin de value interne, on utilise le formulaire interne.
   */
  @Input()
  set value(value: FormFieldValue) {
    this.form.patchValue(value);
    this.onChange(value); // related to the control value accessor onChange
    this.stateChanges.next();
  }

  get value(): FormFieldValue {
    return this.form.value;
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
    // le formulaire interne doit etre disable aussi
    this.form.disable();
    this.stateChanges.next();
  };

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Permet de déterminer si le control est en erreur ou pas.
   */
  get errorState(): boolean {
    // on retourne l'état du formulaire parent
    return this._defaultErrorStateMatcher.isErrorState(this.ngControl.control, null);
  }

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

  constructor(private _focusMonitor: FocusMonitor,
              private _fb: FormBuilder,
              private _defaultErrorStateMatcher: ErrorStateMatcher,
              @Optional() @Self() public ngControl: NgControl) {
    // On initialise le formulaire interne
    this.form = this._fb.group({
      scope: null,
      query: null,
    });

    // On veut notifier un changement à chaque fois que les valeurs du formulaire interne changent.
    this.form.valueChanges.subscribe(value => this.onChange(value));

    if (this.ngControl != null) {
      // On set le valueAccessor à travers le constructeur (au lieu des providers) pour ne pas tomber sur
      // des imports circulaires.
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Cette méthode va permettre de définir comment écrire les valeurs.
   * @param obj ce qui est renvoyé par l'élément du formulaire.
   */
  public writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }

  /**
   * Cette méthode va permettre de définir une fonction de callback pour dire qu'il y a eu un changement.
   * @param fn la fonction de callback.
   */
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Cette méthode va permettre de définir une fonction de callback pour dire que le control a été touché.
   * @param fn la fonction de callback.
   */
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Methode non obligatoire qui permet de définir le status 'disabled' du control.
   * @param isDisabled
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
    // on a rien a faire si le control est disable
    if (this.disabled) {
      return;
    }
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
   * Une fonction custom qui permet de donner le status touched au blur.
   */
  public _onFocusOut(): void {
    this.onTouched();
    this.focused = false;
    this.stateChanges.next();
  }


  /**
   * On n'oublis surtout pas de terminer les souscriptions.
   */
  public ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._inputRef);
    this.stateChanges.complete();
  }
}

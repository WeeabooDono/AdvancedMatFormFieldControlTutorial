import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormFieldValue } from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.model';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgForm, ReactiveFormsModule,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import {
  AdvancedSearchControlErrorStateMatcher,
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.error-state-matcher';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

class SearchInputBase {
  /**
   * Émet chaque fois que l'état du composant change et doit entraîner la mise à jour du champ de formulaire parent.
   * Utilisé avec les `MatFormFieldControl`.
   */
  readonly stateChanges = new Subject<void>();

  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /**
     * Formulaire lié au composant.
     * Utilisé avec les  `MatFormFieldControl`.
     */
    public ngControl: NgControl,
  ) {
  }
}

/**
 * Un mixin pour ajouter la gestion des erreurs dans notre composant.
 *
 * Pour faire simple un mixin est une classe que l'on va faire hériter à une autre qui peut être utilisé à la fois pour
 * instancier de nouveaux objets et pour étendre d'autres classes.
 * Au lieu d'avoir une hiérarchie entre les deux classes, c'est le composant d'une classe pour en faire une plus grosse.
 */
const _SearchInputMixinBase = mixinErrorState(SearchInputBase);

@Component({
  selector: 'app-advanced-search',
  templateUrl: 'advanced-search-control.component.html',
  styleUrls: ['advanced-search-control.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  /**
   * Le composant MatFormField va récupérer l'information des MatFormFieldControls à travers
   * @ContentChild(MatFormFieldControl) _formFieldControl: MatFormFieldControl<any>;
   * https://github.com/angular/components/blob/main/src/material/form-field/form-field.ts#L168
   *
   * Comme MatFormFieldControl est une classe abstraite et non concrète et qu'il est impossible de travailler avec des
   * elements abstraits (on ne peut pas faire new MatFormFieldControl(...deps)), il nous donner la classe concrète qui
   * va remplacer cette classe abstraite. On le fait à travers les providers.
   *
   * On ajoute un ErrorStateMatcher custom pour avoir le comportement désiré.
   */
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: AdvancedSearchControlComponent,
    },
    {
      provide: ErrorStateMatcher,
      useClass: AdvancedSearchControlErrorStateMatcher,
    },
  ],
  standalone: true,
  imports: [
    MatSelectModule,
    MatDividerModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class AdvancedSearchControlComponent
  extends _SearchInputMixinBase
  implements OnInit, DoCheck, AfterViewInit, OnChanges, OnDestroy, MatFormFieldControl<FormFieldValue>, ControlValueAccessor {
  /**
   * Ce champ va correspondre au prochain id à ajouter à la classe de notre `AdvancedSearchControlComponent`.
   */
  static nextId = 0;

  @HostBinding('class.app-advanced-search-control') public isAppAdvancedSearch: boolean = true;

  @ViewChild(MatInput, { read: ElementRef, static: true })
  private _inputRef!: ElementRef;

  @ViewChild(MatInput)
  private _input!: MatInput;

  @ViewChild('customPlaceholder')
  private _customPlaceholderRef!: ElementRef;

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

  get queryCtrl(): AbstractControl | null {
    return this.form.get('query');
  }

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
  private _placeholder?: string;
  private _matLabel?: Element | null;

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this._placeholder || '';
  }

  /**
   * @private Permet de déterminer si le control est requis.
   */
  private _required: boolean = false;

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
  private _disabled: boolean = false;

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
   * Un nom optionnel qui permet de distinguer les différents `mat-form-field` selon leur type de control.
   * le formulaire ajoutera une class `mat-form-field-type-{{controlType}}` à son élément de base.
   */
  readonly controlType?: string = 'app-advanced-search-form-field';

  constructor(private _focusMonitor: FocusMonitor,
              private _fb: FormBuilder,
              public _defaultErrorStateMatcher: ErrorStateMatcher,
              @Optional() public _parentForm: NgForm,
              @Optional() public _parentFormGroup: FormGroupDirective,
              @Optional() @Self() public ngControl: NgControl) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
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
   * Dans cette partie, on veut monitorer notre input text afin de changer l'état à focus quand on clic
   * sur le formulaire.
   */
  public ngOnInit() {
    this._focusMonitor.monitor(this._inputRef).subscribe((focused: FocusOrigin) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });
  }

  public ngAfterViewInit(): void {
    this._matLabel = document.querySelector('.app-advanced-search-control + .mat-form-field-label-wrapper mat-label');
  }

  /**
   * On veut qu'à chaque changement, on notifie angular qu'il y a eu une modification.
   */
  public ngOnChanges() {
    this.stateChanges.next();
  }

  /**
   * On va utiliser cet étape du cycle de vie pour uptade l'état de l'erreur.
   */
  public ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }

    if (this._customPlaceholderRef && !this._customPlaceholderRef.nativeElement.innerText && this._matLabel) {
      this._customPlaceholderRef.nativeElement.innerText = this._matLabel.innerHTML + (this._required ? ' *' : '');
    }
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
   * Une fonction custom qui permet de donner le status 'touched' au blur.
   */
  public _onFocusOut(): void {
    this.onTouched();
    this.focused = false;
    this.stateChanges.next();
  }

  /**
   * On n'oublie surtout pas de terminer les souscriptions.
   */
  public ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._inputRef);
    this.stateChanges.complete();
  }

  public canDisplay(): boolean {
    return (this.queryCtrl && !this.queryCtrl.value)!
      && !(this.errorState && !!this._matLabel)
      && !(this.focused && !this.errorState && !!this._matLabel);
  }
}

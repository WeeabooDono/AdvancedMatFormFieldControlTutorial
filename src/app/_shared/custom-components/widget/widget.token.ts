import { InjectionToken } from '@angular/core';
import { WidgetInterface } from '@shared/custom-components/widget/widget.interface';

// pourquoi un Injection token ? https://angular.io/api/core/InjectionToken
// pour les interfaces, types, tableaux, on peux implement une classe Abstraite dans notre cas pour ne pas utiliser le token
export const WIDGET = new InjectionToken<WidgetInterface>('WIDGET');

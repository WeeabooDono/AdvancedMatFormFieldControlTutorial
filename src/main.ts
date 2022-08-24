import { enableProdMode, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { environment } from '@env';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/app.routing';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

registerLocaleData(localeFr, 'trololo');

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'trololo' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(ROUTES),
    ]),
  ],
}).catch(err => console.error(err));

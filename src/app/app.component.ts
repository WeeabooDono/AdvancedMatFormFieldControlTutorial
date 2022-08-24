import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  AdvancedSearchControlRequiredDirective
} from '@shared/custom-form-fields/advanced-search-control/advanced-search-control.required.directive';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
  ],
})
export class AppComponent {
  title = 'AdvancedMatFormFieldControlTutorial';
}

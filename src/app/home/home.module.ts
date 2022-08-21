import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class HomeModule {
}

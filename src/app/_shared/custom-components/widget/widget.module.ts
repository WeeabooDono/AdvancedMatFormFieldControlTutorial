import { NgModule } from '@angular/core';
import { WidgetWrapperComponent } from '@shared/custom-components/widget/widget-wrapper/widget-wrapper.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WidgetDateComponent } from '@shared/custom-components/widget/widget-date/widget-date.component';
import { WidgetWeatherComponent } from '@shared/custom-components/widget/widget-weather/widget-weather.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatProgressBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  declarations: [WidgetWrapperComponent, WidgetWeatherComponent, WidgetDateComponent],
  exports: [WidgetWrapperComponent, WidgetWeatherComponent, WidgetDateComponent],
})
export class WidgetModule {
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { WidgetInterface } from '@shared/custom-components/widget/widget.interface';
import { WIDGET } from '@shared/custom-components/widget/widget.token';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-widget-date',
  templateUrl: 'widget-date.component.html',
  styleUrls: ['widget-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: WIDGET,
      useExisting: WidgetDateComponent,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
})
export class WidgetDateComponent implements WidgetInterface {

  public loading = false;

  constructor(private _cd: ChangeDetectorRef) {
  }

  public refresh(): void {
    this.load();
  }

  public load(): void {
    console.log('Chargement de la date ...');
    this.loading = true;
    this._cd.detectChanges();

    setTimeout(() => {
      console.log('Date chargée.');
      this.loading = false;
      this._cd.detectChanges();
    }, 2500);
  }

  public now(): Date {
    return new Date();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Widget } from '@shared/custom-components/widget/widget';

@Component({
  selector: 'app-widget-date',
  templateUrl: 'widget-date.component.html',
  styleUrls: ['widget-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: Widget,
      useExisting: WidgetDateComponent,
    },
  ],
})
export class WidgetDateComponent extends Widget {

  public loading = false;

  constructor(private _cd: ChangeDetectorRef) {
    super();
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

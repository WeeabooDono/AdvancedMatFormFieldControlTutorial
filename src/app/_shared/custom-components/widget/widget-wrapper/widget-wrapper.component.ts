import { ChangeDetectionStrategy, Component, ContentChild, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WidgetInterface } from '@shared/custom-components/widget/widget.interface';
import { WIDGET } from '@shared/custom-components/widget/widget.token';
import { getWidgetMissingInterfaceError } from '@shared/custom-components/widget/widget.error';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: 'widget-wrapper.component.html',
  styleUrls: ['widget-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class WidgetWrapperComponent implements OnInit {

  @ContentChild(WIDGET, { static: true })
  public widget!: WidgetInterface;


  public refresh(): void {
    this.widget.refresh();
  }

  public ngOnInit(): void {
    this._assertWidget();
    this.widget.load();
  }

  private _assertWidget() {
    if (!this.widget) {
      throw getWidgetMissingInterfaceError();
    }
  }
}

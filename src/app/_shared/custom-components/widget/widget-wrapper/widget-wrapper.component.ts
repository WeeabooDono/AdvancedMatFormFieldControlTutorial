import { ChangeDetectionStrategy, Component, ContentChild, OnInit, ViewEncapsulation } from '@angular/core';
import { WidgetInterface } from '@shared/custom-components/widget/widget.interface';
import { WIDGET } from '@shared/custom-components/widget/widget.token';
import { getWidgetMissingInterfaceError } from '@shared/custom-components/widget/widget.error';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: 'widget-wrapper.component.html',
  styleUrls: ['widget-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    CommonModule,
  ],
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

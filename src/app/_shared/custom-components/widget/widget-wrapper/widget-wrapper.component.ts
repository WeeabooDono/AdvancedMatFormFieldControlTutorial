import { ChangeDetectionStrategy, Component, ContentChild, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WidgetInterface } from '@shared/custom-components/widget/widget.interface';
import { WIDGET } from '@shared/custom-components/widget/widget.token';

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
    this.widget.load();
  }
}

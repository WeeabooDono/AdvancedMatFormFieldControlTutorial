import { ChangeDetectionStrategy, Component, ContentChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Widget } from '@shared/custom-components/widget/widget';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: 'widget-wrapper.component.html',
  styleUrls: ['widget-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class WidgetWrapperComponent implements OnInit {

  @ContentChild(Widget, { static: true })
  public widget!: Widget;


  public refresh(): void {
    this.widget.refresh();
  }

  public ngOnInit(): void {
    this.widget.load();
  }
}

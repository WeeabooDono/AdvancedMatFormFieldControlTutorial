import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { WidgetInterface } from '@shared/custom-components/widget/widget.interface';
import { HttpClient } from '@angular/common/http';
import { map, NEVER, Observable, startWith, switchMap, timer } from 'rxjs';
import { WIDGET } from '@shared/custom-components/widget/widget.token';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

interface WeatherForecast {
  time: string;
  temperature: number;
}

@Component({
  selector: 'app-widget-weather',
  templateUrl: 'widget-weather.component.html',
  styleUrls: ['widget-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    {
      provide: WIDGET,
      useExisting: WidgetWeatherComponent,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTableModule,
  ],
})
export class WidgetWeatherComponent implements WidgetInterface {

  // Paris
  static readonly LATITUDE = 48.8567;
  static readonly LONGITUDE = 2.3510;

  private readonly TIMER = 1000;

  public loading = false;

  private readonly _data$: Observable<any> = NEVER;
  public weatherForecasts$: Observable<WeatherForecast[]> = NEVER;
  public displayedColumns = ['time', 'temperature'];

  constructor(private _cd: ChangeDetectorRef, private _http: HttpClient) {
    this._data$ = this._http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${ WidgetWeatherComponent.LATITUDE }&longitude=${ WidgetWeatherComponent.LONGITUDE }&hourly=temperature_2m`);
    this.weatherForecasts$ =
      timer(this.TIMER).pipe(
        startWith([
          { time: '2022-08-23T00:00', temperature: 19.4 },
          { time: '2022-08-23T01:00', temperature: 19.1 },
          { time: '2022-08-23T02:00', temperature: 18.9 },
          { time: '2022-08-23T03:00', temperature: 18.6 },
          { time: '2022-08-23T04:00', temperature: 18.3 },
        ]),
        switchMap(() => this._data$),
        map(data => {
          return ({ times: data.hourly.time as string[], temperatures: data.hourly.temperature_2m as number[] });
        }),
        map(data => {
          const arr1 = data.times;
          const arr2 = data.temperatures;

          return arr1.reduce((accumulator, element, index) => {
            return [...accumulator, { time: element, temperature: arr2[index] }];
          }, [] as WeatherForecast[]).splice(0, 5);
        }),
      );
  }

  public refresh(): void {
    this.load();
  }

  public load(): void {
    console.log('Chargement des données de temperature ...');
    this.loading = true;
    this._cd.detectChanges();

    setTimeout(() => {
      console.log('Données de température chargée.');
      this.loading = false;
      this._cd.detectChanges();
    }, this.TIMER);
  }
}

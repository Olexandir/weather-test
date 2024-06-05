import { Component, Signal, effect, inject } from '@angular/core';

import { WeatherDataService } from '../../store/weather-store.service';
import { CityWeather } from '../../interfaces/weather.interface';
import { HOME_DEPS } from './home.deps';
import { DailyDatasource, HourlyDatasource } from '../../interfaces/home.interface';
import { dailyColumns, hourlyColumns } from './home.constants';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: HOME_DEPS,
})
export class HomeComponent {
  public cities: { [key: string]: CityWeather } | undefined;
  private daily: DailyDatasource[] = [];
  private hourly: HourlyDatasource[] = [];

  public data: DailyDatasource[] | HourlyDatasource[] = [];
  public columns: string[] = [];

  public preset: 'daily' | 'hourly' = 'daily';
  public reversePreset = this.preset === 'daily' ? 'hourly' : 'daily';

  private serv = inject(WeatherDataService);

  constructor() {
    effect(() => {
      this.cities = this.serv.getState();

      let d: DailyDatasource[] = [];
      let h: HourlyDatasource[] = [];
      const c = Object.values(this.cities);

      for (let i = 0; i < c.length; i++) {
        const { city, daily, hourly } = c[i];
        d = [...d, { city, daily }];
        h = [...h, { city, hourly: hourly.filter((hour, index) => index % 3 === 2) }];
      }

      this.daily = d;
      this.hourly = h;

      this.toggleTableInfo();
    });
  }

  public togglePreset(): void {
    this.preset = this.preset === 'daily' ? 'hourly' : 'daily';
    this.reversePreset = this.preset === 'daily' ? 'hourly' : 'daily';
    this.toggleTableInfo();
  }

  private toggleTableInfo(): void {
    if (this.preset === 'daily') {
      this.setView(dailyColumns, this.daily);
    } else {
      this.setView(hourlyColumns, this.hourly);
    }
  }

  private setView(columns: string[], data: DailyDatasource[] | HourlyDatasource[]): void {
    this.columns = columns;
    this.data = data;
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';

import { WeatherDataService } from '../../store/weather-store.service';
import { ReloadService } from '../../services/reload.service';

import { CityWeather } from '../../interfaces/weather.interface';
import { DailyDatasource, HourlyDatasource } from '../../interfaces/home.interface';

import { dailyColumns, hourlyColumns } from './home.constants';

import { HOME_DEPS } from './home.deps';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: HOME_DEPS,
})
export class HomeComponent {
  public cities: { [key: string]: CityWeather } | undefined;
  public data: DailyDatasource[] | HourlyDatasource[] = [];
  public columns: string[] = [];
  public preset: 'daily' | 'hourly' | string = '';
  public reversePreset: 'daily' | 'hourly' | string = '';

  private serv = inject(WeatherDataService);
  private chDetect = inject(ChangeDetectorRef);
  private reloadServ = inject(ReloadService);

  constructor() {
    effect(() => {
      this.cities = this.serv.getState();
      this.setDataSources();
      this.toggleTableInfo();
      this.chDetect.detectChanges();
    });
  }

  ngOnInit(): void {
    this.setPreset();
  }

  private setPreset(): void {
    const urlPreset = this.reloadServ.getParamFromUrl('periodicity');
    if (urlPreset) {
      this.preset = urlPreset;
    } else {
      this.preset = 'daily';
      this.reloadServ.setParam(this.preset, 'periodicity');
    }
    this.setReversePreset();
  }

  private setReversePreset(): void {
    this.reversePreset = this.preset === 'daily' ? 'hourly' : 'daily';
  }

  public togglePreset(): void {
    this.preset = this.preset === 'daily' ? 'hourly' : 'daily';
    this.setReversePreset();
    this.reloadServ.setParam(this.preset, 'periodicity');
    this.toggleTableInfo();
  }

  private setDataSources(): void {
    const dailyDataSource: DailyDatasource[] = [];
    const hourlyDataSource: HourlyDatasource[] = [];

    for (const [city, { daily, hourly }] of Object.entries(this.cities)) {
      dailyDataSource.push({ city, daily });

      const filteredHourly = hourly.filter((_, index) => index % 3 === 2);
      hourlyDataSource.push({ city, hourly: filteredHourly });
    }

    this.data = this.preset === 'daily' ? dailyDataSource : hourlyDataSource;
  }

  private toggleTableInfo(): void {
    if (this.preset === 'daily') {
      this.setView(dailyColumns, this.data);
    } else {
      this.setView(hourlyColumns, this.data);
    }
  }

  private setView(columns: string[], data: DailyDatasource[] | HourlyDatasource[]): void {
    this.columns = columns;
    this.data = data;
  }
}

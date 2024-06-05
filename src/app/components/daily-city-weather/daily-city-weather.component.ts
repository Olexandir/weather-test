import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';

import { CommonMaterialTableComponent } from '../abstracts/common-table.component';

import { DailyDatasource, HourlyDatasource } from '../../interfaces/home.interface';

import { DAILY_CITY_WEATHER_DEPS } from './daily-city-weather.deps';

@Component({
  standalone: true,
  selector: 'daily-city-weather',
  templateUrl: './daily-city-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: DAILY_CITY_WEATHER_DEPS,
})
export class DailyCityWeatherComponent extends CommonMaterialTableComponent<DailyDatasource | HourlyDatasource> {
  public periodicity = input.required<'daily' | 'hourly'>();

  public preiodicityValue: string;

  constructor() {
    super();
    effect(() => (this.preiodicityValue = this.periodicity()));
  }
}

import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';

import { CommonMaterialTableComponent } from '../abstracts/common-table.component';

import { DailyDatasource, HourlyDatasource } from '../../interfaces/home.interface';

import { DAILY_CITY_WEATHER_DEPS } from './city-weather.deps';

@Component({
  standalone: true,
  selector: 'city-weather',
  templateUrl: './city-weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: DAILY_CITY_WEATHER_DEPS,
})
export class DailyCityWeatherComponent extends CommonMaterialTableComponent<DailyDatasource | HourlyDatasource> {
  public periodicity = input.required<'daily' | 'hourly' | string>();

  public preiodicityValue: string;

  constructor() {
    super();
    effect(() => (this.preiodicityValue = this.periodicity()));
  }
}

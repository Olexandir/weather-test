import { Component, effect, input } from '@angular/core';
import { CommonMaterialTableComponent } from '../abstracts/common-table.component';
import { DAILY_CITY_WEATHER_DEPS } from './daily-city-weather.deps';
import { DailyDatasource, HourlyDatasource } from '../../interfaces/home.interface';

@Component({
  standalone: true,
  selector: 'daily-city-weather',
  templateUrl: './daily-city-weather.component.html',
  styleUrl: './daily-city-weather.component.scss',
  imports: DAILY_CITY_WEATHER_DEPS,
})
export class DailyCityWeatherComponent extends CommonMaterialTableComponent<DailyDatasource | HourlyDatasource> {
  public periodicity = input.required<'daily' | 'hourly'>();

  preiodicityValue: string;

  constructor() {
    super();
    effect(() => this.preiodicityValue = this.periodicity())
  }
}

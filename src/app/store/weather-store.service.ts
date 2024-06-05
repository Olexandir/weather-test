import { Injectable, inject } from '@angular/core';

import { Observable, catchError, filter, forkJoin, map, of, switchMap, tap } from 'rxjs';

import { DataService } from './data-store';
import { CityService } from '../services/city.service';
import { WeatherService } from '../services/weather.service';

import { dailyWeatherMapping, hourlyWeatherMapping } from '../utils/weather-mapping';

import { CityWeather, DailyWeatherDTO, HourlyWeatherDTO } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService extends DataService<CityWeather> {
  cityServ = inject(CityService);
  weatherServ = inject(WeatherService);

  override loadData(city: string): void {
    if (this.hasData(city)) {
      return;
    } else {
      this.getCityWeather(city)
        .pipe(tap((data) => this.setState(data.city, data)))
        .subscribe();
    }
  }

  public getCityWeather(city: string): Observable<CityWeather> {
    const cityWeather: Observable<CityWeather> = this.cityServ.getCity(city).pipe(
      filter((cities) => !!cities.length),
      catchError((e) => of(e)),
      map((cities) => cities[0]),
      switchMap(({ name, lat, lon }) => {
        const hourly = this.weatherServ.getWeather(lat, lon, 'daily') as Observable<HourlyWeatherDTO>;
        const daily = this.weatherServ.getWeather(lat, lon, 'hourly') as Observable<DailyWeatherDTO>;
        return forkJoin([of(name), hourly, daily]);
      }),
      map(([name, hourlyData, dailyData]) => {
        const hourly = hourlyWeatherMapping(hourlyData);
        const daily = dailyWeatherMapping(dailyData);
        return { city: name, daily, hourly };
      })
    );
    return cityWeather;
  }
}

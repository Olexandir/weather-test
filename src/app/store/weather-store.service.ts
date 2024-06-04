import { Injectable, inject } from '@angular/core';
import { DataService } from './data-store';
import { CityWeather, DailyWeatherDTO, HourlyWeatherDTO, SingleHourWeather } from '../interfaces/weather.interface';
import { Observable, catchError, filter, first, forkJoin, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { CityService } from '../services/city.service';
import { WeatherService } from '../services/weather.service';
import { dailyWeatherMapping, hourlyWeatherMapping } from '../utils/weather-mapping';

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
        .pipe(tap((data) => this.setState(city, data)))
        .subscribe();
    }
  }

  getCityWeather(city: string): Observable<CityWeather> {
    const cityWeather: Observable<CityWeather> = this.cityServ.getCity(city).pipe(
      filter((cities) => !!cities.length),
      catchError((e) => of(e)),
      take(1),
      map((cities) => cities[0]),
      switchMap(({ lat, lon }) => {
        const hourly = this.weatherServ.getWeather(lat, lon, 'daily') as Observable<HourlyWeatherDTO>;
        const daily = this.weatherServ.getWeather(lat, lon, 'hourly') as Observable<DailyWeatherDTO>;
        return forkJoin([hourly, daily]);
      }),
      map(([hourlyData, dailyData]) => {
        const hourly = hourlyWeatherMapping(hourlyData);
        const daily = dailyWeatherMapping(dailyData);

        return {
          city,
          daily,
          hourly,
        };
      })
    );
    return cityWeather;
  }
}

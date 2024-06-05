import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { DailyWeatherDTO, HourlyWeatherDTO } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  private readonly api_prefix = environment.API_PREFIX;
  private readonly api_root = '/data/2.5/onecall';

  public getWeather(
    lat: number,
    lon: number,
    periodicity: 'daily' | 'hourly'
  ): Observable<HourlyWeatherDTO | DailyWeatherDTO> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', `current,minutely,${periodicity},alerts`);

    return this.http.get<HourlyWeatherDTO | DailyWeatherDTO>(this.api_prefix + this.api_root, { params })
  }
}

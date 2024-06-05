import { Component, Signal, effect, inject } from '@angular/core';

import { WeatherDataService } from '../../store/weather-store.service';
import { CityWeather } from '../../interfaces/weather.interface';
import { HOME_DEPS } from './home.deps';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: HOME_DEPS
})
export class HomeComponent {
  serv = inject(WeatherDataService);
  cities: Signal<{ [key: string]: CityWeather; }> | undefined;

  constructor() {
    effect(() => {
      this.cities = this.serv.getState();
      console.log(this.cities());
    });
  }

  ngOnInit(): void {
    const city = 'London';
    this.cities = this.serv.getState();

    this.getCity('London');
    this.getCity('Minsk');
    this.getCity('Moscow');
    this.getCity('Washington');
    this.getCity('Loiyo8tn');
  }

  getCity(city: string): void {
    this.serv.loadData(city);
  }
}

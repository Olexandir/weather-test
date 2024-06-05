import { CityWeather } from './weather.interface';

export type DailyDatasource = Omit<CityWeather, 'hourly'>;
export type HourlyDatasource = Omit<CityWeather, 'daily'>;

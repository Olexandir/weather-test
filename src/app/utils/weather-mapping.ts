import {
  DailyWeatherDTO,
  HourlyWeatherDTO,
  SingleDayWeather,
  SingleHourWeather,
} from '../interfaces/weather.interface';

export const dailyWeatherMapping = (dailyWeatherResponce: DailyWeatherDTO): SingleDayWeather[] => {
  return dailyWeatherResponce.daily.map(({ dt, temp }) => ({
    day: dt,
    temperature: temp.day,
  }));
};

export const hourlyWeatherMapping = (hourlyWeatherResponce: HourlyWeatherDTO): SingleHourWeather[] => {
  return hourlyWeatherResponce.hourly.map(({ dt, temp }) => ({
    hour: dt,
    temperature: temp,
  }));
};

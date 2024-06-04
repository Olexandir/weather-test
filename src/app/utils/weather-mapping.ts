import { DailyWeatherDTO, HourlyWeatherDTO, SingleDayWeather, SingleHourWeather } from '../interfaces/weather.interface';

export const dailyWeatherMapping = (dailyWeatherResponce: DailyWeatherDTO): SingleDayWeather[] => {
  const days = dailyWeatherResponce.daily.map((day) => ({
    day: day.dt,
    temperature: day.temp.day,
  }));
  return days;
};

export const hourlyWeatherMapping = (hourlyWeatherResponce: HourlyWeatherDTO): SingleHourWeather[] => {
  const hours = hourlyWeatherResponce.hourly.map((hour) => ({
    hour: hour.dt,
    temperature: hour.temp,
  }));
  return hours;
};

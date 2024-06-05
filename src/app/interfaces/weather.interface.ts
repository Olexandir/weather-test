interface WeatherDTO {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

interface CommonWeatherInfoDTO {
  dt: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  pop: number;
}

interface SingleDayWeatherDTO extends CommonWeatherInfoDTO {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  clouds: number;
  uvi: number;
}

interface SingleHourWeatherDTO extends CommonWeatherInfoDTO {
  temp: number;
  feels_like: number;
  uvi: number;
  clouds: number;
  visibility: number;
}

export interface DailyWeatherDTO extends WeatherDTO {
  daily: SingleDayWeatherDTO[];
}

export interface HourlyWeatherDTO extends WeatherDTO {
  hourly: SingleHourWeatherDTO[];
}

export interface CityWeather {
  city: string;
  daily: SingleDayWeather[];
  hourly: SingleHourWeather[];
}

export interface SingleHourWeather {
  hour: number;
  temperature: number;
}

export interface SingleDayWeather {
  day: number;
  temperature: number;
}

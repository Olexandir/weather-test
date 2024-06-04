export interface CityDTO {
  country: string;
  lat: number;
  local_names: { [key: string]: string };
  lon: number;
  name: string;
  state: string;
}

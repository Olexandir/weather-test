import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { DegreeConversionPipe } from "../../pipes/degree-conversion.pipe";

export const DAILY_CITY_WEATHER_DEPS = [
  CommonModule,
  MatTableModule,
  DegreeConversionPipe
]

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'degreeConversion',
})
export class DegreeConversionPipe implements PipeTransform {
  transform(kelvinDegree: number): string {
    return `${Math.round(kelvinDegree - 273.15)}°`;
  }
}

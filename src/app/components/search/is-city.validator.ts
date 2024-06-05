import { Injectable, inject } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { CityService } from '../../services/city.service';

@Injectable({ providedIn: 'root' })
export class IsCityValidator implements AsyncValidator {
  private cityServ = inject(CityService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.cityServ.getCity(control.value).pipe(
      map((cities) => (!!cities.length ? null : { noCity: true })),
      catchError(() => of(null))
    );
  }
}

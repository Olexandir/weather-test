import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { CityDTO } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly http = inject(HttpClient);

  private readonly api_prefix = environment.API_PREFIX;
  private readonly api_root = '/geo/1.0/direct';

  public getCity(city: string): Observable<CityDTO[]> {
    const params = new HttpParams().set('q', city).set('limit', '1');
    return this.http.get<CityDTO[]>(this.api_prefix + this.api_root, {
      params,
    });
  }
}

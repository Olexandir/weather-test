import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReloadService {
  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public setParams(city: string, preiodicity: string): void {
    this.router.navigate([], { queryParams: { city, preiodicity } });
  }

  public setParam(param: string, paramName: 'periodicity' | 'city'): void {
    const queryParams = { ...this.actRoute.snapshot.queryParams };
    queryParams[paramName] = param;

    this.router.navigate([], { queryParams });
  }

  public getParamFromUrl(param: 'periodicity' | 'city'): string {
    return this.actRoute.snapshot.queryParams[param];
  }
}

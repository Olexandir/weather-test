import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReloadService {
  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef: DestroyRef = inject(DestroyRef);

  setParams(city: string, preiodicity: string) {
    this.router.navigate([], { queryParams: { city, preiodicity } });
  }

  setParam(param: string, paramName: 'periodicity' | 'city'): void {
    const queryParams = { ...this.actRoute.snapshot.queryParams };
    queryParams[paramName] = param;

    this.router.navigate([], { queryParams });
  }

  getParamFromUrl(param: 'periodicity' | 'city'): string {
    return this.actRoute.snapshot.queryParams[param];
  }
}

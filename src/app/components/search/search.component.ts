import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IsCityValidator } from './is-city.validator';
import { WeatherDataService } from '../../store/weather-store.service';

import { SEARCH_DEPS } from './search.deps';
import { ReloadService } from '../../services/reload.service';
import { distinctUntilChanged, first } from 'rxjs';

type FormMap<T> = {
  [Property in keyof T]: FormControl<T[Property]>;
};
interface SearchForm {
  city: string;
}

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: SEARCH_DEPS,
})
export class SearchComponent {
  private isCityValidator = inject(IsCityValidator);
  private weatherService = inject(WeatherDataService);
  private reloadServ = inject(ReloadService);
  private chDetect = inject(ChangeDetectorRef);
  private destroy: DestroyRef = inject(DestroyRef);

  public searchForm = new FormGroup<FormMap<SearchForm>>({
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
      asyncValidators: [this.isCityValidator.validate.bind(this.isCityValidator)],
      updateOn: 'submit',
    }),
  });

  public cityControl = this.searchForm.controls.city;

  ngOnInit(): void {
    this.handleCityValueFromUrl();
    this.handleFormValuesChange();
  }

  public onSubmit(): void {
    this.handleFormStatusChange();
  }

  private handleCityValueFromUrl(): void {
    const cityFromUrl = this.reloadServ.getParamFromUrl('city');
    if (cityFromUrl) {
      this.cityControl.setValue(cityFromUrl, { emitEvent: false });
      this.searchForWeather();
    }
  }

  private handleFormValuesChange(): void {
    this.cityControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroy), distinctUntilChanged())
      .subscribe((city) => this.reloadServ.setParam(city, 'city'));
  }

  private handleFormStatusChange(): void {
    this.searchForm.statusChanges.pipe(first(), takeUntilDestroyed(this.destroy)).subscribe((status) => {
      if (status !== 'PENDING' && status === 'VALID') {
        this.searchForWeather();
      }
      this.chDetect.detectChanges();
      return;
    });
  }

  private searchForWeather(): void {
    const city = this.cityControl.value;
    this.weatherService.loadData(city);
  }
}

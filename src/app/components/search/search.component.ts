import { Component, DestroyRef, inject } from '@angular/core';
import { SEARCH_DEPS } from './search.deps';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IsCityValidator } from './is-city.validator';
import { WeatherDataService } from '../../store/weather-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  styleUrl: './search.component.scss',
  imports: SEARCH_DEPS,
})
export class SearchComponent {
  private isCityValidator = inject(IsCityValidator);
  private weatherService = inject(WeatherDataService);

  private readonly destroy: DestroyRef = inject(DestroyRef);

  public searchForm = new FormGroup<FormMap<SearchForm>>({
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
      asyncValidators: [this.isCityValidator.validate.bind(this.isCityValidator)],
      updateOn: 'submit',
    }),
  });

  public onSubmit(): void {
    this.searchForm.statusChanges.pipe(takeUntilDestroyed(this.destroy)).subscribe((status) => {
      if (status !== 'PENDING' && status === 'VALID') {
        this.searchForWeather();
      }
      return;
    });
  }

  private searchForWeather(): void {
    const city = this.searchForm.controls.city.value;
    this.weatherService.loadData(city);
  }
}

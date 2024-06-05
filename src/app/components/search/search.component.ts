import { Component } from '@angular/core';
import { SEARCH_DEPS } from './search.deps';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: SEARCH_DEPS,
})
export class SearchComponent { }

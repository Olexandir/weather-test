import { Component } from '@angular/core';

import { APP_DEPS } from './app.deps';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: APP_DEPS,
})
export class AppComponent {
  title = 'weather-test';
}

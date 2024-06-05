import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const SEARCH_DEPS = [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule];

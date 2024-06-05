import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (request, next) => {
  const api_key = environment.API_KEY;

  const newRequest = request.clone({
    setParams: {
      appid: api_key,
    },
  });

  return next(newRequest);
};

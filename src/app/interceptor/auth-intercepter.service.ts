import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private api: ApiService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.api.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders().set('Authorization', user.token), //new HttpHeaders('Authorization',user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

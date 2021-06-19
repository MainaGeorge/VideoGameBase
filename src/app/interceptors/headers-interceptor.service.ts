import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setParams: {
        key: 'c04acbc995ea42309a3f8de7610333a1',
      }
    });

    return next.handle(req);
  }
}

export const HttpHeadersInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass : HeadersInterceptor,
  multi: true
}

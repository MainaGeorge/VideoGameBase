import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError as observableThrowError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError( (error) => {
        console.log(error);
        return observableThrowError(error);
      })
    );
  }
}

export const HttpErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}


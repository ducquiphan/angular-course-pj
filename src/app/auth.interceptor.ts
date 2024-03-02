import {HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {tap} from "rxjs/operators";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const modifiedReq = req.clone({
    headers: req.headers.append('Auth', 'xyz'),
  });
  console.log('Request is on its way');
  console.log(req.url);
  return next(modifiedReq).pipe(tap(
    event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log('Response arrived, body data: ');
        console.log(event.body);
      }
    },
  ));
};

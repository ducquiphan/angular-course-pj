import {HttpEventType, HttpInterceptorFn} from '@angular/common/http';
import {tap} from "rxjs/operators";

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing request');
  console.log(req.url);
  const modifiedReq = req.clone();
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log('Response arrived, body data: ');
      console.log(event.body);
    }
  }));
};

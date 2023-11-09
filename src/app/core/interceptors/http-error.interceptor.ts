import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from '../services/message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        let errorMsg = '';

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error: ${err.error.message}`;
        } else if (Array.isArray(err.error) && err.error.length > 0) {
          errorMsg = `Error: ${err.error[0]}`
        } else if (err.error.errors) {
          errorMsg = `Error: ${err.error.errors}`
        } else {
          errorMsg = `Error Code: ${err.status},  Message: ${err.error.error}`;
        }

        this.messageService.add(errorMsg)

        return throwError(() => new Error(''))
      })
    );
  }
}

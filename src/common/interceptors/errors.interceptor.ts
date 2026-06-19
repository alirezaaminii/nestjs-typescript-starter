import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('[4 INTERCEPTOR] before');
    return next.handle().pipe(
      catchError((err) => {
        console.log('[5 INTERCEPTOR]', err);

        return throwError(() => new BadGatewayException(err));
      }),
    );
  }
}

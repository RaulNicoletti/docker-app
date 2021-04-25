import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDefaultResponse } from 'src/interfaces/default-reponse.interface.';
import { Response } from '../types/request.type';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const { statusCode } = context.switchToHttp().getResponse<Response>();
        const res: IDefaultResponse = {
          status: statusCode,
          data,
        };

        return res;
      }),
    );
  }
}

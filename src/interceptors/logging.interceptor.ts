import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { LoggerService } from '../modules/logger/logger.service';
import { Request } from '../types/request.type';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    this.logRequest(context);
    return next.handle();
  }

  private logRequest(context: ExecutionContext) {
    const handlerName = context.getHandler().name;
    const className = context.getClass().name;
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const request = {
      ip: req.ip,
      hostname: req.hostname,
      url: req.url,
      method: req.method,
      user: req.user,
    };
    const log = {
      class: className,
      handler: handlerName,
      request,
    };

    this.logger.log(log, 'Request');
  }
}

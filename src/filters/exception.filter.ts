import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import * as chalk from 'chalk';
import { IDefaultResponse } from '../interfaces/default-reponse.interface.';
import { Response, Request } from '../types/request.type';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = this.getStatus(exception);
    const message = this.getMessage(exception);

    if (process.env.LOG_EXCEPTIONS === 'true') {
      this.createException(exception, ctx);
    }

    const response: IDefaultResponse = {
      status,
      error: message,
    };

    res.status(status).send(response);
  }

  private createException(exception: any, ctx: HttpArgumentsHost): void {
    const req = ctx.getRequest<Request>();
    const request = {
      ip: req.ip,
      hostname: req.hostname,
      url: req.url,
      method: req.method,
      user: req.user,
    };

    Reflect.defineProperty(exception, 'request', { value: request });
    this.logException(exception);
  }

  private logException(exception: any) {
    console.log('\n');
    console.group(
      chalk.redBright('[Exception] -'),
      chalk.whiteBright(new Date().toLocaleString()),
    );
    Reflect.ownKeys(exception).forEach((prop) =>
      console.log(chalk.blueBright(prop), exception[prop]),
    );
    console.groupEnd();
  }

  private getStatus(exception: any): number {
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    return status;
  }

  private getMessage(exception: any): string {
    const isHttpException = exception instanceof HttpException;
    const message = isHttpException
      ? exception.message
      : 'Erro interno no servidor.';

    return message;
  }
}

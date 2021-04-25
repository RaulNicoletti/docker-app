import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IDefaultResponse } from 'src/interfaces/default-reponse.interface.';
import { Response } from '../types/request.type';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = isHttpException
      ? exception.message
      : 'Erro interno no servidor.';

    console.log(exception);

    const res: IDefaultResponse = {
      status,
      error,
    };

    response.status(status).send(res);
  }
}

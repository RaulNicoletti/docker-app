import { HttpStatus } from '@nestjs/common';

export class IDefaultResponse {
  status: HttpStatus;
  error?: string;
  data?: any;
}

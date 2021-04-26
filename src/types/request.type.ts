import { FastifyRequest, FastifyReply as Response } from 'fastify';
import { User } from '@prisma/client';

interface Request extends FastifyRequest {
  user: Partial<User>;
}

export { Request, Response };

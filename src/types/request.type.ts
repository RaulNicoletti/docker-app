import { FastifyRequest, FastifyReply as Response } from 'fastify';
import { User } from 'src/entities/user.entity';

interface Request extends FastifyRequest {
  user: Partial<User>;
}

export { Request, Response };

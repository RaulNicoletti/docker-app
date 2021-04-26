import { User } from '@prisma/client';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  find(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: Partial<User>): Promise<User>;
  update(id: number, user: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<User | null>;
}

import { Entity, Column } from 'typeorm';
import { Base } from '@lib/base.entity';

@Entity('users')
export class User extends Base {
  @Column()
  public email: string;

  @Column()
  public password: string;
}

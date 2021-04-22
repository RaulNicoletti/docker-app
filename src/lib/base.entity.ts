import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity('users')
export class Base {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @BeforeInsert()
  protected updateDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  protected updateDate() {
    this.updatedAt = new Date();
  }
}

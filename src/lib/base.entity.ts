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
  protected createdAt: Date;

  @Column()
  protected updatedAt: Date;

  @BeforeInsert()
  protected updateDates() {
    const date = new Date();
    this.createdAt = date;
    this.updatedAt = date;
  }

  @BeforeUpdate()
  protected updateDate() {
    const date = new Date();
    this.updatedAt = date;
  }
}

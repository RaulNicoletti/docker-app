import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export class CreateUserTable1619046028496 implements MigrationInterface {
  private tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: false,
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: false,
        },
      ],
    });

    await queryRunner.createTable(table);

    const unique = new TableUnique({ columnNames: ['email'] });

    await queryRunner.createUniqueConstraint(this.tableName, unique);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const uniques = table?.uniques.map((uq) => uq);

    if (uniques.length > 0) {
      await queryRunner.dropUniqueConstraints(this.tableName, uniques);
    }

    await queryRunner.dropTable(this.tableName);
  }
}

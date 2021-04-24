import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'A',
  database: 'postgres',
  schema: 'public',
  entities: ['dist/entities/*.entity{.ts,.js}', 'entities/*.entity{.ts,.js}'],
  subscribers: [
    'dist/subscribers/*.subscriber{.ts,.js}',
    'subscribers/*.subscriber{.ts,.js}',
  ],
  migrations: ['dist/migrations/*{.ts,.js}', 'migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export { options };

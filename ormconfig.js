module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'A',
    database: 'postgres',
    schema: 'public',
    entities: ['dist/entities/*.entity{.ts,.js}'],
    subscribers: ['dist/subscribers/*.subscriber{.ts,.js}'],
    migrations: ['migrations/dist/*.js'],
    synchronize: false,
    logging: true,
    cli: {
      migrationsDir: 'migrations',
    },
  },
];

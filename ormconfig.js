module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'A',
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
  },
];

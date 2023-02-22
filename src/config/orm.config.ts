import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { config } from 'dotenv';

config();
//Lembrar de colocar todas as entidades nas entities
export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Users],
  synchronize: false,
  autoLoadEntities: true,
};

export const OrmConfig: TypeOrmModuleOptions = {
  ...typeOrmModuleOptions,
  migrations: ['dist/db/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: 'dist/db/migrations',
  },
};

export default OrmConfig;
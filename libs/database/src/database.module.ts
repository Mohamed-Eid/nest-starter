import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { DrizzleDb } from './types/drizzle';
export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        console.log(
          'Database URL===============================' + databaseUrl,
        );
        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: true,
        });
        console.log('Database connected' + databaseUrl);
        return drizzle(pool, {
          logger: true,
          schema: schema,
        }) as DrizzleDb;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}

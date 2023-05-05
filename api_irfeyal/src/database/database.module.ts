import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('HOST_DB'),
        port: config.get<number>('PORTDB'),
        username: config.get<string>('USERNAMEDB'),
        password: config.get<string>('PASSWORDDB'),
        database: config.get<string>('DBNAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: false,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

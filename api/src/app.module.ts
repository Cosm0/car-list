import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { APP_FILTER } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { RentersModule } from './renters/renters.module';
import { GlobalExceptionFilter } from './global-exception.filter';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule, ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        database: configService.get('db.database'),
        username: configService.get('db.user'),
        password: configService.get('db.password'),
        synchronize: configService.get('node_env') === 'develop',
        entities: ['dist/typeorm/entities/*{.ts,.js}'],
        migrations:
          configService.get('node_env') === 'production'
            ? ['dist/typeorm/migrations/*{.ts,.js}']
            : [],
        migrationsRun: configService.get('node_env') === 'production',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    VehiclesModule,
    RentersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

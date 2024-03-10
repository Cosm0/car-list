import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { User } from 'src/typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule, ConfigModule, UsersModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        database: configService.get('db.database'),
        username: configService.get('db.user'),
        password: configService.get('db.password'),
        synchronize: true,
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

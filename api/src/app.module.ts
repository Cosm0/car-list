import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule, ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('db.host');
        const database = configService.get('db.database');
        const username = configService.get('db.user');
        const password = configService.get('db.password');

        return {
          type: 'mysql',
          host,
          database,
          username,
          password,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

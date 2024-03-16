import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: configService.get('isProduction'),
        transform: true,
      }),
    );

    await app.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}
bootstrap();

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Gracefully shutting down...');
  process.exit();
});

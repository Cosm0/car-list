import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('port');

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

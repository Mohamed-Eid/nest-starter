import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.createApplicationContext(WorkerModule);
  await NestFactory.createApplicationContext(WorkerModule);
  const logger = new Logger('Worker');

  logger.log('Worker service is running...');
  logger.log('Scheduled tasks are active');
  logger.log('This worker has no HTTP server - it only runs background tasks');
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  // process.exit(1);
});

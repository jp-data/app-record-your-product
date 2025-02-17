import 'reflect-metadata'
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose']
  });

  const allowedUrls = process.env.NODE_ENV === 'production' ?
    ['https://app-record-your-product.vercel.app']
    : ['http://localhost:5173']


  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Allowed Origins:', allowedUrls);

  app.enableCors({
    origin: allowedUrls,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();

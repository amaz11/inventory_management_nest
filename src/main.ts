import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import { HttpExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api/v1')

  app.useGlobalFilters(new HttpExceptionFilter())
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000, () => {
    console.log('server is runing');
  });
}
bootstrap();

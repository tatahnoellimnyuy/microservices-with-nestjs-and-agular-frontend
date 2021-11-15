import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // here to to set the global prifux example localhost:300/api/ 
  // here to to set the global prifux example localhost:300/api/ 
  app.setGlobalPrefix('api');
  app.enableCors({
    origin:'http://localhost:4200'
  })
  await app.listen(3000);
}
bootstrap();

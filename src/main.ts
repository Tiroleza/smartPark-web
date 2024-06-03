import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe from @nestjs/common package

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json());
  app.enableCors(); //por estar em duas portas diferentes, é necessário habilitar o CORS
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não especificadas no DTO
      forbidNonWhitelisted: true, // Retorna erro se houver propriedades não especificadas
      transform: true, // Transforma o payload para o tipo especificado no DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();

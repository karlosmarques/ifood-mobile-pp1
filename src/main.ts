import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    app.enableCors({
    origin: 'http://localhost:3000', //Dafni, se a porta for essa pode deixar 3000, mas se for outra troca 😉
    credentials: true
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();

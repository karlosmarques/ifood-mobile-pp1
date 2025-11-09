import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestauranteModule } from './restaurante/restaurante.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [RestauranteModule,PrismaModule,RestauranteModule, CategoriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

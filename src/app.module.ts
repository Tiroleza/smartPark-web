import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EstacionamentoController } from './app.controller';
import { EstacionamentoService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EstacionamentoSchema } from '../schemas/estacionamento.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'Estacionamento', schema: EstacionamentoSchema },
    ]),
  ],
  controllers: [EstacionamentoController],
  providers: [EstacionamentoService],
})
export class AppModule {}

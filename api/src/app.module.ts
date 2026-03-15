import { Module } from '@nestjs/common';
import { EstacionamentoController } from './app.controller';
import { EstacionamentoService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EstacionamentoSchema } from '../schemas/estacionamento.schema';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: 'Estacionamento', schema: EstacionamentoSchema },
    ]),
  ],
  controllers: [EstacionamentoController],
  providers: [EstacionamentoService],
})
export class AppModule {}

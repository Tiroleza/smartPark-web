import { Module } from '@nestjs/common';
import { EstacionamentoController } from './app.controller'; // Fix import statement
import { EstacionamentoService } from './app.service'; // Remove unused import
import { DatabaseModule } from '../src/database/database.module';
import { EstacionamentoSchema } from '../schemas/estacionamento.schema';
import { MongooseModule } from '@nestjs/mongoose';

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
export class CriarEstacionamentoDto {
  placa: string;
}

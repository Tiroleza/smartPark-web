import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Estacionamento,
  EstacionamentoDocument,
} from '../schemas/estacionamento.schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class EstacionamentoService {
  constructor(
    @InjectModel(Estacionamento.name)
    private estacionamentoModel: Model<EstacionamentoDocument>,
  ) {}

  async criarEstacionamento(placa: string) {
    const novoEstacionamento = new this.estacionamentoModel({ placa });
    return novoEstacionamento.save();
  }
}

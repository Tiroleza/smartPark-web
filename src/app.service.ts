import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Estacionamento,
  EstacionamentoDocument,
} from '../schemas/estacionamento.schema';
import { PlacaDto } from './dto/criar-estacionamento.dto';
@Injectable()
export class EstacionamentoService {
  constructor(
    @InjectModel(Estacionamento.name)
    private estacionamentoModel: Model<EstacionamentoDocument>,
  ) {}

  async criarEstacionamento(placa: string) {
    const novaPlaca = new this.estacionamentoModel({ placa });
    return novaPlaca.save();
  }
  async listarEstacionamentos(): Promise<PlacaDto[]> {
    const estacionamentos = await this.estacionamentoModel
      .find()
      .sort({ entrada: 1 })
      .exec();
    return estacionamentos.map((estacionamento) => ({
      placa: estacionamento.placa,
    }));
  }
}

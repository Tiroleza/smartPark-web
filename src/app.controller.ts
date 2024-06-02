import { Controller, Post, Body } from '@nestjs/common';
import { EstacionamentoService } from './app.service';
import { CriarEstacionamentoDto } from './app.module';

@Controller('estacionamentos')
export class EstacionamentoController {
  constructor(private readonly estacionamentoService: EstacionamentoService) {}

  @Post()
  async criar(@Body() criarEstacionamentoDto: CriarEstacionamentoDto) {
    return this.estacionamentoService.criarEstacionamento(
      criarEstacionamentoDto.placa,
    );
  }
}

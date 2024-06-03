import { Controller, Post, Body } from '@nestjs/common';
import { EstacionamentoService } from './app.service';
import { CriarEstacionamentoDto } from './criar-estacionamento.dto';

@Controller()
export class EstacionamentoController {
  constructor(private readonly estacionamentoService: EstacionamentoService) {}

  @Post('/estacionamentos')
  async criar(@Body() criarEstacionamentoDto: CriarEstacionamentoDto) {
    console.log('Requisição recebida:', criarEstacionamentoDto);
    return this.estacionamentoService.criarEstacionamento(
      criarEstacionamentoDto.placa,
    );
  }
}

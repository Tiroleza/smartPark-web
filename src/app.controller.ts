import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EstacionamentoService } from './app.service';
import { PlacaDto } from './dto/criar-estacionamento.dto';

@Controller('')
export class EstacionamentoController {
  private readonly logger = new Logger(EstacionamentoController.name);

  constructor(private readonly estacionamentoService: EstacionamentoService) {}

  @Post('/estacionamentos')
  @UsePipes(new ValidationPipe({ transform: true }))
  async criar(@Body() criarEstacionamentoDto: PlacaDto) {
    try {
      const estacionamento =
        await this.estacionamentoService.criarEstacionamento(
          criarEstacionamentoDto.placa,
        );
      this.logger.log(`Placa registrada com sucesso: ${estacionamento.placa}`);

      return estacionamento;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erro ao registrar a placa',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

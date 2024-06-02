import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { EstacionamentoService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json());

  app.post('/registrar-placa', async (req, res) => {
    const placa = req.body.placa;

    if (!placa || !/^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/.test(placa)) {
      return res.status(400).json({ error: 'Placa inválida' });
    }

    try {
      const estacionamento = await app
        .get(EstacionamentoService)
        .criarEstacionamento(placa);
      res.json(estacionamento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar a placa' });
    }
  });
  await app.listen(3000);
}
bootstrap();

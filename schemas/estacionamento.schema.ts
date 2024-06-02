import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Estacionamento {
  @Prop()
  placa: string;

  @Prop({ type: Date, default: Date.now })
  entrada: Date;

  @Prop({ type: Date })
  saida?: Date;
}

export const EstacionamentoSchema =
  SchemaFactory.createForClass(Estacionamento);

export type EstacionamentoDocument = Estacionamento & Document;

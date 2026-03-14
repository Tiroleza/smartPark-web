import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Estacionamento {
  @Prop()
  placa: string;
}

export const EstacionamentoSchema =
  SchemaFactory.createForClass(Estacionamento);

export type EstacionamentoDocument = Estacionamento & Document;

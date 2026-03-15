import { IsString, Matches, Length } from 'class-validator';

export class PlacaDto {
  @IsString()
  @Length(7, 7)
  @Matches(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/, {
    message: 'Placa inválida',
  })
  placa: string;
}

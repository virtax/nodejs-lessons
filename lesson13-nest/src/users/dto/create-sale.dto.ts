import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  id?: number;

  @IsNotEmpty()
  product: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  price: number;
}

import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSportDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsIn(['male', 'female', 'mix'])
  allowedGender: 'male' | 'female' | 'mix';
}

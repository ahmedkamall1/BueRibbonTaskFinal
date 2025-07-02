import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @IsDateString()
  birthDate: string;

  @IsDateString()
  subscriptionDate: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}

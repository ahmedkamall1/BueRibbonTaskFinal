import { IsIn, IsInt } from 'class-validator';

export class SubscribeDto {
  @IsInt()
  memberId: number;

  @IsInt()
  sportId: number;

  @IsIn(['group', 'private'])
  type: 'group' | 'private';
}

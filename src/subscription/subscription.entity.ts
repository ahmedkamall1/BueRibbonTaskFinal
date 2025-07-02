import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Member } from '../member/member.entity';
import { Sport } from '../sport/sport.entity';

@Entity()
@Unique(['member', 'sport'])
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.subscriptions)
  member: Member;

  @ManyToOne(() => Sport)
  sport: Sport;

  @Column()
  type: 'group' | 'private';
}

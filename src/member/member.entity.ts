import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Subscription } from '../subscription/subscription.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: 'male' | 'female';

  @Column()
  birthDate: Date;

  @Column()
  subscriptionDate: Date;

  // Link to parent member (central member)
  @ManyToOne(() => Member, (member) => member.familyMembers, { nullable: true })
  parent: Member;

  // Link to family members
  @OneToMany(() => Member, (member) => member.parent)
  familyMembers: Member[];

  @OneToMany(() => Subscription, (sub) => sub.member)
  subscriptions: Subscription[];
}

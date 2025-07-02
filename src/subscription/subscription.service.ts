import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Member } from '../member/member.entity';
import { Sport } from '../sport/sport.entity';
import { SubscribeDto } from './dto/subscribe.dto';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
    @InjectRepository(Sport)
    private readonly sportRepo: Repository<Sport>,
  ) {}

  async subscribe(dto: SubscribeDto) {
    const existing = await this.subRepo.findOne({
      where: {
        member: { id: dto.memberId },
        sport: { id: dto.sportId },
      },
    });

   if (existing) {
  throw new BadRequestException('Member is already subscribed to this sport.');
}

    const member = await this.memberRepo.findOneBy({ id: dto.memberId });
    const sport = await this.sportRepo.findOneBy({ id: dto.sportId });

    const sub = this.subRepo.create({
      member,
      sport,
      type: dto.type,
    });

    return this.subRepo.save(sub);
  }

  async unsubscribe(memberId: number, sportId: number) {
    return this.subRepo.delete({ member: { id: memberId }, sport: { id: sportId } });
  }
}

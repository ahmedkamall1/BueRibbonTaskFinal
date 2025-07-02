import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  async create(dto: CreateMemberDto) {
  const member = this.memberRepo.create(dto);

  if (dto.parentId) {
    const parent = await this.memberRepo.findOneBy({ id: dto.parentId });
    if (!parent) throw new NotFoundException('Parent member not found');
    member.parent = parent;
  }

  return this.memberRepo.save(member);
}

  findOne(id: number) {
    return this.memberRepo.findOne({
      where: { id },
      relations: ['subscriptions', 'subscriptions.sport'],
    });
  }

  findAll() {
    return this.memberRepo.find({ relations: ['subscriptions', 'subscriptions.sport'] });
  }

  async update(id: number, dto: CreateMemberDto) {
  const member = await this.memberRepo.preload({ id, ...dto });
  if (!member) throw new NotFoundException('Member not found');

  if (dto.parentId) {
    const parent = await this.memberRepo.findOneBy({ id: dto.parentId });
    if (!parent) throw new NotFoundException('Parent member not found');
    member.parent = parent;
  } else {
    member.parent = null;
  }

  return this.memberRepo.save(member);
}

  async remove(id: number) {
    const member = await this.memberRepo.findOneBy({ id });
    if (!member) throw new NotFoundException('Member not found');
    return this.memberRepo.remove(member);
  }
}

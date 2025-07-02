import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.entity';
import { CreateSportDto } from './dto/create-sport.dto';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepo: Repository<Sport>,
  ) {}

  async create(dto: CreateSportDto) {
    const sport = this.sportRepo.create(dto);
    return this.sportRepo.save(sport);
  }

  async findAll() {
    return this.sportRepo.find();
  }

  async update(id: number, dto: CreateSportDto) {
    return this.sportRepo.update(id, dto);
  }

  async remove(id: number) {
    return this.sportRepo.delete(id);
  }
}

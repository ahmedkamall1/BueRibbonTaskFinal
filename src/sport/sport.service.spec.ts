import { Test, TestingModule } from '@nestjs/testing';
import { SportService } from './sport.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sport } from './sport.entity';
import { Repository } from 'typeorm';

describe('SportService', () => {
  let service: SportService;
  let repo: Repository<Sport>;

  const mockSportRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((sport) => Promise.resolve({ id: 1, ...sport })),
    find: jest.fn(() => Promise.resolve([{ id: 1, name: 'Tennis', price: 100, allowedGender: 'mix' }])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SportService,
        {
          provide: getRepositoryToken(Sport),
          useValue: mockSportRepository,
        },
      ],
    }).compile();

    service = module.get<SportService>(SportService);
    repo = module.get<Repository<Sport>>(getRepositoryToken(Sport));
  });

  it('should create a sport', async () => {
    const dto: { name: string; price: number; allowedGender: "mix" | "male" | "female" } = { name: 'Tennis', price: 100, allowedGender: 'mix' };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should return all sports', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      { id: 1, name: 'Tennis', price: 100, allowedGender: 'mix' },
    ]);
  });
});

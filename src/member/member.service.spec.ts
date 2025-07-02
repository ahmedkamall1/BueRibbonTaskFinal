import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { Repository } from 'typeorm';

describe('MemberService', () => {
  let service: MemberService;
  let repo: Repository<Member>;

  const mockRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((member) => Promise.resolve({ id: 1, ...member })),
    findOne: jest.fn(),
    find: jest.fn(() => Promise.resolve([{ id: 1, firstName: 'Ahmad' }])),
    preload: jest.fn(),
    remove: jest.fn(),
    findOneBy: jest.fn(() => Promise.resolve({ id: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repo = module.get(getRepositoryToken(Member));
  });

  it('should create a member', async () => {
    const dto: { firstName: string; lastName: string; gender: "male" | "female"; birthDate: string; subscriptionDate: string } = {
      firstName: 'Ahmad',
      lastName: 'Kamal',
      gender: 'male',
      birthDate: '2000-01-01',
      subscriptionDate: '2025-07-01',
    };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should return all members', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });
});

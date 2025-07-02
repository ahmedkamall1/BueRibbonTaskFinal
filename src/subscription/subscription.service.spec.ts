import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { Member } from '../member/member.entity';
import { Sport } from '../sport/sport.entity';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  const mockSubRepo = {
    findOne: jest.fn(() => null),
    create: jest.fn((dto) => dto),
    save: jest.fn((sub) => Promise.resolve({ id: 1, ...sub })),
    delete: jest.fn(),
  };

  const mockMemberRepo = {
    findOneBy: jest.fn(() => ({ id: 1 })),
  };

  const mockSportRepo = {
    findOneBy: jest.fn(() => ({ id: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getRepositoryToken(Subscription),
          useValue: mockSubRepo,
        },
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepo,
        },
        {
          provide: getRepositoryToken(Sport),
          useValue: mockSportRepo,
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
  });

  it('should subscribe a member to a sport', async () => {
    const dto: { memberId: number; sportId: number; type: "group" | "private" } = { memberId: 1, sportId: 1, type: 'group' };
    const result = await service.subscribe(dto);
    expect(result).toEqual({ id: 1, member: { id: 1 }, sport: { id: 1 }, type: 'group' });
  });

  it('should unsubscribe a member from a sport', async () => {
    const result = await service.unsubscribe(1, 1);
    expect(mockSubRepo.delete).toHaveBeenCalledWith({
      member: { id: 1 },
      sport: { id: 1 },
    });
  });
});

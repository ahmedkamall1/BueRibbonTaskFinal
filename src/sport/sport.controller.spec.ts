import { Test, TestingModule } from '@nestjs/testing';
import { SportController } from './sport.controller';
import { SportService } from './sport.service';

describe('SportController', () => {
  let controller: SportController;
  let service: SportService;

  const mockSportService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportController],
      providers: [
        {
          provide: SportService,
          useValue: mockSportService,
        },
      ],
    }).compile();

    controller = module.get<SportController>(SportController);
    service = module.get<SportService>(SportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

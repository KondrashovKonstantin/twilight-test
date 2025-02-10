import { Test, TestingModule } from '@nestjs/testing';
import { TwilightService } from './twilight.service';

describe('TwilightService', () => {
  let service: TwilightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwilightService],
    }).compile();

    service = module.get<TwilightService>(TwilightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

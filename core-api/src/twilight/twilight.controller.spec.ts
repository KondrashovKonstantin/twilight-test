import { Test, TestingModule } from '@nestjs/testing';
import { TwilightController } from './twilight.controller';

describe('TwilightController', () => {
  let controller: TwilightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwilightController],
    }).compile();

    controller = module.get<TwilightController>(TwilightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

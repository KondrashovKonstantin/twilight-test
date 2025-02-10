import { Module } from '@nestjs/common';
import { TwilightController } from './twilight.controller';
import { TwilightService } from './twilight.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule, AuthModule],
  controllers: [TwilightController],
  providers: [TwilightService],
})
export class TwilightModule {}

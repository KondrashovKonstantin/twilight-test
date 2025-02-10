import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { TwilightService } from './twilight.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { SearchDto } from './dto/search.dto';

@Controller('twilight')
export class TwilightController {
  constructor(private readonly twilightService: TwilightService) {}

  @UseGuards(AuthGuard)
  @Post('search')
  async search(@Req() req, @Body() body: SearchDto) {
    const user = req.user;
    const { apiKey } = user;
    const { domain, nextToken } = body;
    return this.twilightService.search(domain, apiKey, nextToken);
  }

  @UseGuards(AuthGuard)
  @Post('get-chart-data')
  async getChartData(@Req() req, @Body() body: SearchDto) {
    const user = req.user;
    const { apiKey } = user;
    const { domain } = body;
    return this.twilightService.getChartsData(domain, apiKey);
  }
}

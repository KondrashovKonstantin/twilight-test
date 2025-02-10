import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { ListingDto } from './dto/listing.dto';

@Injectable()
export class TwilightService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async search(domain: string, apiKey: string, nextToken?: string) {
    try {
      const body = {
        size: 20,
        domains: [domain],
        email_domains: [domain],
        root_domains: [domain],
        app_domains: [domain],
      };
      if (nextToken) {
        body['next'] = nextToken;
      }
      const paginatedRes = await this.httpService
        .post(
          this.configService.get<string>('TWILIGHT_URL') +
            '/infections/_search',
          body,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        )
        .toPromise();
      const { data, next, total_items_count, items_count } = paginatedRes.data;
      return {
        total: total_items_count,
        count: items_count,
        next,
        domain: domain,
        results: data.map((item: any) =>
          plainToClass(ListingDto, item, { excludeExtraneousValues: true }),
        ),
      };
    } catch (error) {
      throw new Error('Failed to search');
    }
  }

  async getChartsData(domain: string, apiKey: string) {
    try {
      const res = await this.httpService
        .post(
          this.configService.get<string>('TWILIGHT_URL') +
            '/infections/_search',
          {
            domains: [domain],
            email_domains: [domain],
            root_domains: [domain],
            app_domains: [domain],
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        )
        .toPromise();
      const { data } = res.data;
      const dataByStealerType = {};
      const dataByDate = {};
      const dataByCountry = {};
      data.forEach((item: ListingDto) => {
        if (dataByStealerType[item.stealer_type]) {
          dataByStealerType[item.stealer_type]++;
        } else {
          dataByStealerType[item.stealer_type] = 1;
        }
        const date = new Date(item.date * 1000);
        date.setHours(0, 0, 0, 0);
        const dateKey = date.toISOString();
        if (dataByDate[dateKey]) {
          dataByDate[dateKey]++;
        } else {
          dataByDate[dateKey] = 1;
        }
        const country = item.computer_information.country || 'Unknown';
        if (dataByCountry[country]) {
          dataByCountry[country]++;
        } else {
          dataByCountry[country] = 1;
        }
      });
      return {
        dataByStealerType,
        dataByDate,
        dataByCountry,
      };
    } catch (error) {
      throw new Error('Failed to fetch charts data');
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async signIn(apiKey: string) {
    try {
      const apiResponse = await this.httpService
        .get<{ name: string; email: string; credits: number }>(
          this.configService.get<string>('TWILIGHT_URL') + '/users/current',
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          },
        )
        .toPromise();
      const { name } = apiResponse.data;
      const payload = { name, apiKey };
      const data = {
        access_token: this.jwtService.sign(payload),
      };
      return data;
    } catch (error) {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}

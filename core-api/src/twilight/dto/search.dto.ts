import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsOptional()
  nextToken?: string;
}

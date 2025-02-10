import { Expose, Type } from 'class-transformer';

class ComputerInformationDto {
  @Expose()
  infection_date: string;

  @Expose()
  ip: string;

  @Expose()
  os: string;

  @Expose()
  country: string;
}

class CredentialsDto {
  @Expose()
  url: string;

  @Expose()
  root_domain: string;

  @Expose()
  email_domains: string[];
}

export class ListingDto {
  @Expose()
  id: string;

  @Expose()
  date: number;

  @Expose()
  stealer_type: string;

  @Expose()
  @Type(() => ComputerInformationDto)
  computer_information: ComputerInformationDto;

  @Expose()
  @Type(() => CredentialsDto)
  credentials: CredentialsDto[];
}

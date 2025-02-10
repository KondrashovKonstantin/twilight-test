export interface SearchResult {
  id: string;
  date: number;
  stealer_type: string;
  computer_information: {
    infection_date: string;
    ip: string;
    os: string;
  };
  credentials: {
    url: string;
    root_domain: string;
    email_domains: string[];
  }[];
}

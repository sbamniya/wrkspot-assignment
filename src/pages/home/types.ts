type CountryMedia = {
  emblem: string;
  flag: string;
  orthographic: string;
};

export type Country = {
  abbreviation: string;
  capital: string;
  currency: string;
  id: number;
  media: CountryMedia;
  name: string;
  phone: string;
  population: number;
};
